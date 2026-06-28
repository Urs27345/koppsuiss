package com.saluturs.data

import androidx.room.Entity
import androidx.room.PrimaryKey

enum class MedicationTiming {
    VOR_TABLETTE,
    NACH_TABLETTE,
    KEINE_ANGABE
}

enum class DayPart {
    MORGEN,
    MITTAG,
    ABEND,
    NACHT,
    UNBEKANNT
}

enum class MeasurementSource {
    FOTO_OCR,
    MANUELL
}

enum class GlucoseTiming {
    NUECHTERN,
    VOR_ESSEN,
    NACH_1_STUNDE,
    NACH_2_STUNDEN,
    ANDERE
}

enum class MedicationCategory {
    BLUTDRUCK,
    CHOLESTERIN,
    AUGENTROPFEN,
    BLUTZUCKER,
    SCHMERZMITTEL,
    SONSTIGE
}

enum class EyeSide {
    RECHTS_OD,
    LINKS_OS,
    BEIDE
}

@Entity(tableName = "blood_pressure_entries")
data class BloodPressureEntry(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val timestampMillis: Long,
    val systolic: Int,
    val diastolic: Int,
    val pulse: Int,
    val medicationTiming: MedicationTiming = MedicationTiming.KEINE_ANGABE,
    val dayPart: DayPart = DayPart.UNBEKANNT,
    val arm: String = "",
    val bodyPosition: String = "sitzend",
    val restMinutes: Int? = null,
    val symptoms: String = "",
    val notes: String = "",
    val source: MeasurementSource = MeasurementSource.MANUELL,
    val imageUri: String? = null
)

@Entity(tableName = "weight_entries")
data class WeightEntry(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val timestampMillis: Long,
    val weightKg: Double,
    val waistCm: Double? = null,
    val notes: String = ""
)

@Entity(tableName = "glucose_entries")
data class GlucoseEntry(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val timestampMillis: Long,
    val glucoseMgDl: Int,
    val timing: GlucoseTiming = GlucoseTiming.ANDERE,
    val minutesAfterMeal: Int? = null,
    val mealNotes: String = "",
    val notes: String = "",
    val imageUri: String? = null
)

@Entity(tableName = "eye_entries")
data class EyeEntry(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val timestampMillis: Long,
    val side: EyeSide,
    val intraocularPressureMmHg: Double? = null,
    val visualAcuity: String = "",
    val dropsTaken: Boolean = false,
    val dropsName: String = "",
    val symptoms: String = "",
    val notes: String = "",
    val imageUri: String? = null
)

@Entity(tableName = "medications")
data class Medication(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val name: String,
    val category: MedicationCategory = MedicationCategory.SONSTIGE,
    val doseText: String = "",
    val scheduleText: String = "",
    val active: Boolean = true,
    val notes: String = ""
)

@Entity(tableName = "medication_intakes")
data class MedicationIntake(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val timestampMillis: Long,
    val medicationName: String,
    val doseText: String = "",
    val taken: Boolean = true,
    val notes: String = ""
)

@Entity(tableName = "symptom_entries")
data class SymptomEntry(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val timestampMillis: Long,
    val symptomName: String,
    val severity0To3: Int,
    val notes: String = ""
)

@Entity(tableName = "lab_entries")
data class LabEntry(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val timestampMillis: Long,
    val name: String,
    val value: Double,
    val unit: String,
    val notes: String = ""
)
