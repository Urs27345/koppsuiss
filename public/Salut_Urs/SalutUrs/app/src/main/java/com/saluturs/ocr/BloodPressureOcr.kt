package com.saluturs.ocr

import android.graphics.Bitmap
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import kotlinx.coroutines.tasks.await

data class BloodPressureOcrResult(
    val systolic: Int? = null,
    val diastolic: Int? = null,
    val pulse: Int? = null,
    val rawText: String = ""
)

class BloodPressureOcr {
    private val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)

    suspend fun read(bitmap: Bitmap): BloodPressureOcrResult {
        val image = InputImage.fromBitmap(bitmap, 0)
        val text = recognizer.process(image).await()
        return parse(text.text)
    }

    fun parse(rawText: String): BloodPressureOcrResult {
        val numbers = Regex("\\b\\d{2,3}\\b")
            .findAll(rawText)
            .mapNotNull { it.value.toIntOrNull() }
            .toList()

        val sysCandidates = numbers.filter { it in 80..260 }
        val diaCandidates = numbers.filter { it in 40..160 }
        val pulseCandidates = numbers.filter { it in 35..220 }

        val systolic = sysCandidates.firstOrNull()
        val diastolic = numbers.firstOrNull { candidate ->
            candidate in 40..160 && candidate != systolic && systolic?.let { candidate < it } != false
        } ?: diaCandidates.drop(1).firstOrNull()

        val pulse = numbers.firstOrNull { candidate ->
            candidate in 35..220 && candidate != systolic && candidate != diastolic
        } ?: pulseCandidates.lastOrNull()

        return BloodPressureOcrResult(
            systolic = systolic,
            diastolic = diastolic,
            pulse = pulse,
            rawText = rawText
        )
    }
}
