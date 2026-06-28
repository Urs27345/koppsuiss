package com.saluturs.data

class HealthRepository(private val dao: HealthDao) {
    val bloodPressure = dao.observeBloodPressure()
    val weights = dao.observeWeight()
    val glucose = dao.observeGlucose()
    val eyes = dao.observeEye()
    val medications = dao.observeMedications()
    val medicationIntakes = dao.observeMedicationIntakes()
    val symptoms = dao.observeSymptoms()
    val labs = dao.observeLabs()

    suspend fun addBloodPressure(entry: BloodPressureEntry) = dao.insertBloodPressure(entry)
    suspend fun updateBloodPressure(entry: BloodPressureEntry) = dao.updateBloodPressure(entry)
    suspend fun addWeight(entry: WeightEntry) = dao.insertWeight(entry)
    suspend fun addGlucose(entry: GlucoseEntry) = dao.insertGlucose(entry)
    suspend fun addEye(entry: EyeEntry) = dao.insertEye(entry)
    suspend fun addMedication(entry: Medication) = dao.insertMedication(entry)
    suspend fun addMedicationIntake(entry: MedicationIntake) = dao.insertMedicationIntake(entry)
    suspend fun addSymptom(entry: SymptomEntry) = dao.insertSymptom(entry)
    suspend fun addLab(entry: LabEntry) = dao.insertLab(entry)
    suspend fun bloodPressureFrom(fromMillis: Long) = dao.getBloodPressureFrom(fromMillis)
}
