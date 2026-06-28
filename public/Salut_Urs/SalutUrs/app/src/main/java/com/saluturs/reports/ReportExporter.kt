package com.saluturs.reports

import android.content.Context
import android.content.Intent
import android.graphics.Paint
import android.graphics.pdf.PdfDocument
import android.os.Environment
import androidx.core.content.FileProvider
import com.saluturs.data.BloodPressureEntry
import com.saluturs.data.MedicationTiming
import java.io.File
import java.io.FileOutputStream
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import kotlin.math.roundToInt

enum class ReportLanguage { DE, ES }

object ReportExporter {
    private val fileDate = SimpleDateFormat("yyyy-MM-dd_HH-mm", Locale.US)
    private val displayDate = SimpleDateFormat("dd.MM.yyyy HH:mm", Locale.GERMANY)

    fun exportBloodPressureCsv(context: Context, entries: List<BloodPressureEntry>): File {
        val dir = context.getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS) ?: context.filesDir
        val file = File(dir, "salut_urs_blutdruck_${fileDate.format(Date())}.csv")
        file.parentFile?.mkdirs()
        FileOutputStream(file).bufferedWriter().use { writer ->
            writer.appendLine("Datum;Uhrzeit;SYS;DIA;Puls;Tablette;Tageszeit;Arm;Position;RuheMinuten;Symptome;Notiz;Quelle")
            entries.sortedBy { it.timestampMillis }.forEach { e ->
                val date = Date(e.timestampMillis)
                val d = SimpleDateFormat("yyyy-MM-dd", Locale.US).format(date)
                val t = SimpleDateFormat("HH:mm", Locale.US).format(date)
                writer.appendLine(
                    listOf(
                        d, t, e.systolic, e.diastolic, e.pulse,
                        e.medicationTiming.labelDe(), e.dayPart.name, e.arm, e.bodyPosition,
                        e.restMinutes ?: "", e.symptoms, e.notes, e.source.name
                    ).joinToString(";") { it.toString().replace(";", ",") }
                )
            }
        }
        return file
    }

    fun exportBloodPressurePdf(
        context: Context,
        entries: List<BloodPressureEntry>,
        language: ReportLanguage
    ): File {
        val dir = context.getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS) ?: context.filesDir
        val suffix = if (language == ReportLanguage.ES) "ES" else "DE"
        val file = File(dir, "salut_urs_bericht_blutdruck_${suffix}_${fileDate.format(Date())}.pdf")
        file.parentFile?.mkdirs()

        val sorted = entries.sortedBy { it.timestampMillis }
        val document = PdfDocument()
        val pageInfo = PdfDocument.PageInfo.Builder(595, 842, 1).create()
        val page = document.startPage(pageInfo)
        val canvas = page.canvas
        val paint = Paint(Paint.ANTI_ALIAS_FLAG)
        var y = 42f

        fun text(s: String, size: Float = 11f, bold: Boolean = false, x: Float = 40f) {
            paint.textSize = size
            paint.fakeBoldText = bold
            canvas.drawText(s, x, y, paint)
            y += size + 8f
            paint.fakeBoldText = false
        }

        val title = if (language == ReportLanguage.ES) "Informe de presión arterial - Salut Urs" else "Blutdruckbericht - Salut Urs"
        text(title, 18f, true)
        text(if (language == ReportLanguage.ES) "Generado: ${displayDate.format(Date())}" else "Erstellt: ${displayDate.format(Date())}", 10f)
        y += 4f

        if (sorted.isEmpty()) {
            text(if (language == ReportLanguage.ES) "No hay mediciones registradas." else "Keine Messungen vorhanden.")
        } else {
            val avgSys = sorted.map { it.systolic }.average().roundToInt()
            val avgDia = sorted.map { it.diastolic }.average().roundToInt()
            val avgPulse = sorted.map { it.pulse }.average().roundToInt()
            val maxSys = sorted.maxOf { it.systolic }
            val maxDia = sorted.maxOf { it.diastolic }
            val from = displayDate.format(Date(sorted.first().timestampMillis))
            val to = displayDate.format(Date(sorted.last().timestampMillis))

            if (language == ReportLanguage.ES) {
                text("Resumen", 14f, true)
                text("Periodo: $from hasta $to")
                text("Número de mediciones: ${sorted.size}")
                text("Promedio: $avgSys / $avgDia mmHg, pulso $avgPulse/min")
                text("Máximo registrado: $maxSys / $maxDia mmHg")
            } else {
                text("Zusammenfassung", 14f, true)
                text("Zeitraum: $from bis $to")
                text("Anzahl Messungen: ${sorted.size}")
                text("Durchschnitt: $avgSys / $avgDia mmHg, Puls $avgPulse/min")
                text("Höchster registrierter Wert: $maxSys / $maxDia mmHg")
            }

            y += 8f
            text(if (language == ReportLanguage.ES) "Letzte Messungen" else "Letzte Messungen", 14f, true)
            paint.textSize = 9f
            paint.fakeBoldText = true
            canvas.drawText(if (language == ReportLanguage.ES) "Fecha" else "Datum", 40f, y)
            canvas.drawText("SYS", 165f, y)
            canvas.drawText("DIA", 215f, y)
            canvas.drawText(if (language == ReportLanguage.ES) "Pulso" else "Puls", 265f, y)
            canvas.drawText(if (language == ReportLanguage.ES) "Medicamento" else "Tablette", 325f, y)
            paint.fakeBoldText = false
            y += 14f

            sorted.takeLast(28).forEach { e ->
                if (y > 805f) return@forEach
                canvas.drawText(displayDate.format(Date(e.timestampMillis)), 40f, y)
                canvas.drawText(e.systolic.toString(), 165f, y)
                canvas.drawText(e.diastolic.toString(), 215f, y)
                canvas.drawText(e.pulse.toString(), 265f, y)
                canvas.drawText(if (language == ReportLanguage.ES) e.medicationTiming.labelEs() else e.medicationTiming.labelDe(), 325f, y)
                y += 13f
            }
        }

        document.finishPage(page)
        FileOutputStream(file).use { document.writeTo(it) }
        document.close()
        return file
    }

    fun shareFile(context: Context, file: File) {
        val uri = FileProvider.getUriForFile(context, "${context.packageName}.fileprovider", file)
        val intent = Intent(Intent.ACTION_SEND).apply {
            type = if (file.extension.equals("pdf", ignoreCase = true)) "application/pdf" else "text/csv"
            putExtra(Intent.EXTRA_STREAM, uri)
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }
        context.startActivity(Intent.createChooser(intent, "Datei teilen"))
    }

    private fun MedicationTiming.labelDe(): String = when (this) {
        MedicationTiming.VOR_TABLETTE -> "vor Tablette"
        MedicationTiming.NACH_TABLETTE -> "nach Tablette"
        MedicationTiming.KEINE_ANGABE -> "keine Angabe"
    }

    private fun MedicationTiming.labelEs(): String = when (this) {
        MedicationTiming.VOR_TABLETTE -> "antes del medicamento"
        MedicationTiming.NACH_TABLETTE -> "después del medicamento"
        MedicationTiming.KEINE_ANGABE -> "sin dato"
    }
}
