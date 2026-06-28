package com.saluturs.ui

import android.Manifest
import android.content.pm.PackageManager
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.content.ContextCompat
import com.saluturs.data.*
import com.saluturs.reports.ReportExporter
import com.saluturs.reports.ReportLanguage
import com.saluturs.viewmodel.MainViewModel
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import kotlin.math.max
import kotlin.math.min

private enum class Screen { HOME, BLOOD_PRESSURE, WEIGHT, GLUCOSE, EYE, MEDICATIONS, RECORDS, REPORTS }

@Composable
fun SalutUrsApp(viewModel: MainViewModel) {
    MaterialTheme(
        colorScheme = lightColorScheme(
            primary = Color(0xFF1F5B75),
            secondary = Color(0xFF4A6D7C),
            tertiary = Color(0xFF6F8F72)
        )
    ) {
        var screen by remember { mutableStateOf(Screen.HOME) }
        Surface(modifier = Modifier.fillMaxSize()) {
            when (screen) {
                Screen.HOME -> HomeScreen(onOpen = { screen = it })
                Screen.BLOOD_PRESSURE -> BloodPressureScreen(viewModel, onBack = { screen = Screen.HOME })
                Screen.WEIGHT -> WeightScreen(viewModel, onBack = { screen = Screen.HOME })
                Screen.GLUCOSE -> GlucoseScreen(viewModel, onBack = { screen = Screen.HOME })
                Screen.EYE -> EyeScreen(viewModel, onBack = { screen = Screen.HOME })
                Screen.MEDICATIONS -> MedicationScreen(viewModel, onBack = { screen = Screen.HOME })
                Screen.RECORDS -> RecordsScreen(viewModel, onBack = { screen = Screen.HOME })
                Screen.REPORTS -> ReportsScreen(viewModel, onBack = { screen = Screen.HOME })
            }
        }
    }
}

@Composable
private fun HomeScreen(onOpen: (Screen) -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(20.dp)
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text("Salut Urs", fontSize = 30.sp, fontWeight = FontWeight.Bold)
        Text("Lokales Gesundheitsprotokoll: Blutdruck, Blutzucker, Gewicht, Auge, Medikamente und Berichte.")
        HomeButton("Blutdruck per Foto oder manuell", "SYS / DIA / Puls erkennen, prüfen und speichern") { onOpen(Screen.BLOOD_PRESSURE) }
        HomeButton("Gewicht / Bauchumfang", "Gewicht, Bauchumfang und Notizen erfassen") { onOpen(Screen.WEIGHT) }
        HomeButton("Blutzucker", "mg/dL mit nüchtern / nach Essen dokumentieren") { onOpen(Screen.GLUCOSE) }
        HomeButton("Auge", "Augendruck, Tropfen, Sehbeschwerden und Notizen") { onOpen(Screen.EYE) }
        HomeButton("Medikamente", "Blutdruck, Cholesterin, Augentropfen und sonstige Medikamente") { onOpen(Screen.MEDICATIONS) }
        HomeButton("Einträge und Diagramm", "Letzte Messungen prüfen") { onOpen(Screen.RECORDS) }
        HomeButton("Arztbericht exportieren", "PDF auf Deutsch oder Spanisch, CSV für Excel") { onOpen(Screen.REPORTS) }
    }
}

@Composable
private fun HomeButton(title: String, subtitle: String, onClick: () -> Unit) {
    ElevatedCard(onClick = onClick, modifier = Modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp)) {
            Text(title, fontWeight = FontWeight.Bold, fontSize = 18.sp)
            Text(subtitle, fontSize = 13.sp)
        }
    }
}

@Composable
private fun Header(title: String, onBack: () -> Unit) {
    Row(
        Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(title, fontWeight = FontWeight.Bold, fontSize = 24.sp)
        TextButton(onClick = onBack) { Text("Zurück") }
    }
}

@Composable
private fun BloodPressureScreen(viewModel: MainViewModel, onBack: () -> Unit) {
    val context = LocalContext.current
    var sys by remember { mutableStateOf("") }
    var dia by remember { mutableStateOf("") }
    var pulse by remember { mutableStateOf("") }
    var notes by remember { mutableStateOf("") }
    var symptoms by remember { mutableStateOf("") }
    var arm by remember { mutableStateOf("links") }
    var timing by remember { mutableStateOf(MedicationTiming.KEINE_ANGABE) }
    var ocrRaw by remember { mutableStateOf("") }
    var message by remember { mutableStateOf("") }

    val cameraPermissionLauncher = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { }
    val photoLauncher = rememberLauncherForActivityResult(ActivityResultContracts.TakePicturePreview()) { bitmap ->
        if (bitmap != null) {
            viewModel.readBloodPressureFromBitmap(
                bitmap = bitmap,
                onResult = { result ->
                    sys = result.systolic?.toString() ?: sys
                    dia = result.diastolic?.toString() ?: dia
                    pulse = result.pulse?.toString() ?: pulse
                    ocrRaw = result.rawText
                    message = "Foto gelesen. Werte bitte prüfen und bestätigen."
                },
                onError = { error -> message = error }
            )
        }
    }

    Column(
        Modifier
            .fillMaxSize()
            .padding(20.dp)
            .verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        Header("Blutdruck", onBack)
        Button(onClick = {
            if (ContextCompat.checkSelfPermission(context, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                cameraPermissionLauncher.launch(Manifest.permission.CAMERA)
            } else {
                photoLauncher.launch(null)
            }
        }) { Text("Foto aufnehmen und Werte lesen") }
        if (message.isNotBlank()) Text(message)
        if (ocrRaw.isNotBlank()) {
            Text("OCR-Rohtext: $ocrRaw", fontSize = 12.sp)
        }
        NumberField("SYS / oberer Wert", sys) { sys = it }
        NumberField("DIA / unterer Wert", dia) { dia = it }
        NumberField("Puls", pulse) { pulse = it }
        Text("Tablettenbezug", fontWeight = FontWeight.Bold)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterChip(selected = timing == MedicationTiming.VOR_TABLETTE, onClick = { timing = MedicationTiming.VOR_TABLETTE }, label = { Text("vor Tablette") })
            FilterChip(selected = timing == MedicationTiming.NACH_TABLETTE, onClick = { timing = MedicationTiming.NACH_TABLETTE }, label = { Text("nach Tablette") })
            FilterChip(selected = timing == MedicationTiming.KEINE_ANGABE, onClick = { timing = MedicationTiming.KEINE_ANGABE }, label = { Text("keine Angabe") })
        }
        OutlinedTextField(value = arm, onValueChange = { arm = it }, label = { Text("Arm, z. B. links/rechts") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(value = symptoms, onValueChange = { symptoms = it }, label = { Text("Symptome, z. B. Kopfschmerz, Schwindel") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(value = notes, onValueChange = { notes = it }, label = { Text("Notiz") }, modifier = Modifier.fillMaxWidth())
        Button(onClick = {
            val s = sys.toIntOrNull()
            val d = dia.toIntOrNull()
            val p = pulse.toIntOrNull()
            if (s != null && d != null && p != null) {
                viewModel.addBloodPressure(
                    BloodPressureEntry(
                        timestampMillis = System.currentTimeMillis(),
                        systolic = s,
                        diastolic = d,
                        pulse = p,
                        medicationTiming = timing,
                        dayPart = currentDayPart(),
                        arm = arm,
                        symptoms = symptoms,
                        notes = notes,
                        source = if (ocrRaw.isBlank()) MeasurementSource.MANUELL else MeasurementSource.FOTO_OCR
                    )
                )
                sys = ""; dia = ""; pulse = ""; notes = ""; symptoms = ""; ocrRaw = ""; message = "Gespeichert."
            } else {
                message = "Bitte SYS, DIA und Puls prüfen."
            }
        }) { Text("Bestätigen und speichern") }
    }
}

@Composable
private fun WeightScreen(viewModel: MainViewModel, onBack: () -> Unit) {
    var weight by remember { mutableStateOf("") }
    var waist by remember { mutableStateOf("") }
    var notes by remember { mutableStateOf("") }
    var message by remember { mutableStateOf("") }
    Column(Modifier.fillMaxSize().padding(20.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Header("Gewicht", onBack)
        DecimalField("Gewicht kg", weight) { weight = it }
        DecimalField("Bauchumfang cm (optional)", waist) { waist = it }
        OutlinedTextField(value = notes, onValueChange = { notes = it }, label = { Text("Notiz") }, modifier = Modifier.fillMaxWidth())
        Button(onClick = {
            val w = weight.replace(',', '.').toDoubleOrNull()
            if (w != null) {
                viewModel.addWeight(WeightEntry(timestampMillis = System.currentTimeMillis(), weightKg = w, waistCm = waist.replace(',', '.').toDoubleOrNull(), notes = notes))
                weight = ""; waist = ""; notes = ""; message = "Gespeichert."
            } else message = "Gewicht prüfen."
        }) { Text("Speichern") }
        if (message.isNotBlank()) Text(message)
    }
}

@Composable
private fun GlucoseScreen(viewModel: MainViewModel, onBack: () -> Unit) {
    var glucose by remember { mutableStateOf("") }
    var timing by remember { mutableStateOf(GlucoseTiming.NUECHTERN) }
    var meal by remember { mutableStateOf("") }
    var notes by remember { mutableStateOf("") }
    var message by remember { mutableStateOf("") }
    Column(Modifier.fillMaxSize().padding(20.dp).verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Header("Blutzucker", onBack)
        NumberField("Blutzucker mg/dL", glucose) { glucose = it }
        Text("Messsituation", fontWeight = FontWeight.Bold)
        GlucoseTiming.values().forEach { option ->
            FilterChip(selected = timing == option, onClick = { timing = option }, label = { Text(option.labelDe()) })
        }
        OutlinedTextField(value = meal, onValueChange = { meal = it }, label = { Text("Essen / Mahlzeit optional") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(value = notes, onValueChange = { notes = it }, label = { Text("Notiz") }, modifier = Modifier.fillMaxWidth())
        Button(onClick = {
            val g = glucose.toIntOrNull()
            if (g != null) {
                viewModel.addGlucose(GlucoseEntry(timestampMillis = System.currentTimeMillis(), glucoseMgDl = g, timing = timing, mealNotes = meal, notes = notes))
                glucose = ""; meal = ""; notes = ""; message = "Gespeichert."
            } else message = "Blutzuckerwert prüfen."
        }) { Text("Speichern") }
        if (message.isNotBlank()) Text(message)
    }
}

@Composable
private fun EyeScreen(viewModel: MainViewModel, onBack: () -> Unit) {
    var side by remember { mutableStateOf(EyeSide.LINKS_OS) }
    var pressure by remember { mutableStateOf("") }
    var vision by remember { mutableStateOf("") }
    var drops by remember { mutableStateOf("") }
    var dropsTaken by remember { mutableStateOf(false) }
    var symptoms by remember { mutableStateOf("") }
    var notes by remember { mutableStateOf("") }
    var message by remember { mutableStateOf("") }
    Column(Modifier.fillMaxSize().padding(20.dp).verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Header("Auge", onBack)
        Text("Auge", fontWeight = FontWeight.Bold)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            FilterChip(selected = side == EyeSide.RECHTS_OD, onClick = { side = EyeSide.RECHTS_OD }, label = { Text("rechts OD") })
            FilterChip(selected = side == EyeSide.LINKS_OS, onClick = { side = EyeSide.LINKS_OS }, label = { Text("links OS") })
            FilterChip(selected = side == EyeSide.BEIDE, onClick = { side = EyeSide.BEIDE }, label = { Text("beide") })
        }
        DecimalField("Augendruck mmHg (optional)", pressure) { pressure = it }
        OutlinedTextField(value = vision, onValueChange = { vision = it }, label = { Text("Visus / Sehschärfe optional") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(value = drops, onValueChange = { drops = it }, label = { Text("Augentropfen, z. B. Timoptic") }, modifier = Modifier.fillMaxWidth())
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(checked = dropsTaken, onCheckedChange = { dropsTaken = it })
            Text("Tropfen eingenommen")
        }
        OutlinedTextField(value = symptoms, onValueChange = { symptoms = it }, label = { Text("Symptome Auge") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(value = notes, onValueChange = { notes = it }, label = { Text("Notiz") }, modifier = Modifier.fillMaxWidth())
        Button(onClick = {
            viewModel.addEye(
                EyeEntry(
                    timestampMillis = System.currentTimeMillis(),
                    side = side,
                    intraocularPressureMmHg = pressure.replace(',', '.').toDoubleOrNull(),
                    visualAcuity = vision,
                    dropsTaken = dropsTaken,
                    dropsName = drops,
                    symptoms = symptoms,
                    notes = notes
                )
            )
            pressure = ""; vision = ""; drops = ""; symptoms = ""; notes = ""; message = "Gespeichert."
        }) { Text("Speichern") }
        if (message.isNotBlank()) Text(message)
    }
}

@Composable
private fun MedicationScreen(viewModel: MainViewModel, onBack: () -> Unit) {
    val medications by viewModel.medications.collectAsState()
    var name by remember { mutableStateOf("") }
    var category by remember { mutableStateOf(MedicationCategory.BLUTDRUCK) }
    var dose by remember { mutableStateOf("") }
    var schedule by remember { mutableStateOf("") }
    var notes by remember { mutableStateOf("") }
    Column(Modifier.fillMaxSize().padding(20.dp).verticalScroll(rememberScrollState()), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Header("Medikamente", onBack)
        OutlinedTextField(value = name, onValueChange = { name = it }, label = { Text("Name, z. B. Rosuvastatina") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(value = dose, onValueChange = { dose = it }, label = { Text("Dosis, z. B. 20 mg") }, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(value = schedule, onValueChange = { schedule = it }, label = { Text("Einnahme, z. B. 1x täglich 21:00") }, modifier = Modifier.fillMaxWidth())
        Text("Kategorie", fontWeight = FontWeight.Bold)
        MedicationCategory.values().forEach { c ->
            FilterChip(selected = category == c, onClick = { category = c }, label = { Text(c.labelDe()) })
        }
        OutlinedTextField(value = notes, onValueChange = { notes = it }, label = { Text("Notiz / Nebenwirkungen") }, modifier = Modifier.fillMaxWidth())
        Button(onClick = {
            if (name.isNotBlank()) {
                viewModel.addMedication(Medication(name = name.trim(), category = category, doseText = dose, scheduleText = schedule, notes = notes))
                name = ""; dose = ""; schedule = ""; notes = ""
            }
        }) { Text("Medikament speichern") }
        Divider()
        Text("Gespeicherte Medikamente", fontWeight = FontWeight.Bold)
        medications.forEach { med ->
            Text("${med.name} – ${med.doseText} – ${med.category.labelDe()} – ${med.scheduleText}")
        }
    }
}

@Composable
private fun RecordsScreen(viewModel: MainViewModel, onBack: () -> Unit) {
    val bp by viewModel.bloodPressure.collectAsState()
    val weights by viewModel.weights.collectAsState()
    val glucose by viewModel.glucose.collectAsState()
    val eyes by viewModel.eyes.collectAsState()
    Column(Modifier.fillMaxSize().padding(20.dp)) {
        Header("Einträge", onBack)
        LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
            item {
                if (bp.isNotEmpty()) BloodPressureChart(bp.sortedBy { it.timestampMillis }.takeLast(30))
            }
            item { SectionTitle("Blutdruck") }
            items(bp.take(20)) { e -> Text("${formatDate(e.timestampMillis)} – ${e.systolic}/${e.diastolic}, Puls ${e.pulse}, ${e.medicationTiming.labelDe()}") }
            item { SectionTitle("Gewicht") }
            items(weights.take(10)) { e -> Text("${formatDate(e.timestampMillis)} – ${e.weightKg} kg${e.waistCm?.let { ", Bauch $it cm" } ?: ""}") }
            item { SectionTitle("Blutzucker") }
            items(glucose.take(10)) { e -> Text("${formatDate(e.timestampMillis)} – ${e.glucoseMgDl} mg/dL, ${e.timing.labelDe()}") }
            item { SectionTitle("Auge") }
            items(eyes.take(10)) { e -> Text("${formatDate(e.timestampMillis)} – ${e.side.labelDe()}, Druck ${e.intraocularPressureMmHg ?: "-"} mmHg, Tropfen: ${if (e.dropsTaken) "ja" else "nein"}") }
        }
    }
}

@Composable
private fun ReportsScreen(viewModel: MainViewModel, onBack: () -> Unit) {
    val context = LocalContext.current
    val bp by viewModel.bloodPressure.collectAsState()
    var message by remember { mutableStateOf("") }
    Column(Modifier.fillMaxSize().padding(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Header("Berichte", onBack)
        Text("Exportiert werden aktuell die Blutdruckwerte. Weitere Berichtsmodule für Gewicht, Zucker, Auge und Medikamente sind im Projekt vorbereitet.")
        Button(onClick = {
            val file = ReportExporter.exportBloodPressurePdf(context, bp, ReportLanguage.DE)
            ReportExporter.shareFile(context, file)
            message = "PDF Deutsch erstellt: ${file.name}"
        }) { Text("PDF Deutsch teilen") }
        Button(onClick = {
            val file = ReportExporter.exportBloodPressurePdf(context, bp, ReportLanguage.ES)
            ReportExporter.shareFile(context, file)
            message = "PDF Spanisch erstellt: ${file.name}"
        }) { Text("PDF Spanisch teilen") }
        Button(onClick = {
            val file = ReportExporter.exportBloodPressureCsv(context, bp)
            ReportExporter.shareFile(context, file)
            message = "CSV erstellt: ${file.name}"
        }) { Text("CSV für Excel teilen") }
        if (message.isNotBlank()) Text(message)
    }
}

@Composable
private fun NumberField(label: String, value: String, onValueChange: (String) -> Unit) {
    OutlinedTextField(
        value = value,
        onValueChange = { onValueChange(it.filter { ch -> ch.isDigit() }) },
        label = { Text(label) },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
        modifier = Modifier.fillMaxWidth()
    )
}

@Composable
private fun DecimalField(label: String, value: String, onValueChange: (String) -> Unit) {
    OutlinedTextField(
        value = value,
        onValueChange = { onValueChange(it.filter { ch -> ch.isDigit() || ch == ',' || ch == '.' }) },
        label = { Text(label) },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
        modifier = Modifier.fillMaxWidth()
    )
}

@Composable
private fun SectionTitle(text: String) {
    Text(text, fontWeight = FontWeight.Bold, fontSize = 18.sp, modifier = Modifier.padding(top = 12.dp))
}

@Composable
private fun BloodPressureChart(entries: List<BloodPressureEntry>) {
    if (entries.size < 2) return
    val maxValue = max(180, entries.maxOf { it.systolic } + 10)
    val minValue = min(50, entries.minOf { it.diastolic } - 10)
    ElevatedCard(Modifier.fillMaxWidth().height(220.dp)) {
        Column(Modifier.padding(12.dp)) {
            Text("Blutdruckverlauf", fontWeight = FontWeight.Bold)
            Canvas(modifier = Modifier.fillMaxSize().padding(4.dp)) {
                val widthStep = size.width / (entries.size - 1)
                fun yFor(value: Int): Float {
                    val ratio = (value - minValue).toFloat() / (maxValue - minValue).toFloat()
                    return size.height - ratio * size.height
                }
                val sysPath = Path()
                val diaPath = Path()
                entries.forEachIndexed { index, entry ->
                    val x = index * widthStep
                    val ySys = yFor(entry.systolic)
                    val yDia = yFor(entry.diastolic)
                    if (index == 0) {
                        sysPath.moveTo(x, ySys)
                        diaPath.moveTo(x, yDia)
                    } else {
                        sysPath.lineTo(x, ySys)
                        diaPath.lineTo(x, yDia)
                    }
                    drawCircle(Color(0xFF1F5B75), radius = 3f, center = Offset(x, ySys))
                    drawCircle(Color(0xFF7A4B42), radius = 3f, center = Offset(x, yDia))
                }
                drawPath(sysPath, Color(0xFF1F5B75), style = Stroke(width = 4f, cap = StrokeCap.Round))
                drawPath(diaPath, Color(0xFF7A4B42), style = Stroke(width = 4f, cap = StrokeCap.Round))
            }
        }
    }
}

private fun currentDayPart(): DayPart {
    val hour = java.util.Calendar.getInstance().get(java.util.Calendar.HOUR_OF_DAY)
    return when (hour) {
        in 5..10 -> DayPart.MORGEN
        in 11..14 -> DayPart.MITTAG
        in 15..21 -> DayPart.ABEND
        else -> DayPart.NACHT
    }
}

private fun formatDate(timestampMillis: Long): String =
    SimpleDateFormat("dd.MM.yyyy HH:mm", Locale.GERMANY).format(Date(timestampMillis))

private fun MedicationTiming.labelDe(): String = when (this) {
    MedicationTiming.VOR_TABLETTE -> "vor Tablette"
    MedicationTiming.NACH_TABLETTE -> "nach Tablette"
    MedicationTiming.KEINE_ANGABE -> "keine Angabe"
}

private fun GlucoseTiming.labelDe(): String = when (this) {
    GlucoseTiming.NUECHTERN -> "nüchtern"
    GlucoseTiming.VOR_ESSEN -> "vor Essen"
    GlucoseTiming.NACH_1_STUNDE -> "1 Stunde nach Essen"
    GlucoseTiming.NACH_2_STUNDEN -> "2 Stunden nach Essen"
    GlucoseTiming.ANDERE -> "andere Situation"
}

private fun MedicationCategory.labelDe(): String = when (this) {
    MedicationCategory.BLUTDRUCK -> "Blutdruck"
    MedicationCategory.CHOLESTERIN -> "Cholesterin"
    MedicationCategory.AUGENTROPFEN -> "Augentropfen"
    MedicationCategory.BLUTZUCKER -> "Blutzucker"
    MedicationCategory.SCHMERZMITTEL -> "Schmerzmittel"
    MedicationCategory.SONSTIGE -> "sonstige"
}

private fun EyeSide.labelDe(): String = when (this) {
    EyeSide.RECHTS_OD -> "rechts OD"
    EyeSide.LINKS_OS -> "links OS"
    EyeSide.BEIDE -> "beide"
}
