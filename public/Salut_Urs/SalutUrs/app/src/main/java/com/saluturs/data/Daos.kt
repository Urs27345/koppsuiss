package com.saluturs.data

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface HealthDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertBloodPressure(entry: BloodPressureEntry): Long

    @Update
    suspend fun updateBloodPressure(entry: BloodPressureEntry)

    @Delete
    suspend fun deleteBloodPressure(entry: BloodPressureEntry)

    @Query("SELECT * FROM blood_pressure_entries ORDER BY timestampMillis DESC")
    fun observeBloodPressure(): Flow<List<BloodPressureEntry>>

    @Query("SELECT * FROM blood_pressure_entries WHERE timestampMillis >= :fromMillis ORDER BY timestampMillis ASC")
    suspend fun getBloodPressureFrom(fromMillis: Long): List<BloodPressureEntry>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertWeight(entry: WeightEntry): Long

    @Query("SELECT * FROM weight_entries ORDER BY timestampMillis DESC")
    fun observeWeight(): Flow<List<WeightEntry>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertGlucose(entry: GlucoseEntry): Long

    @Query("SELECT * FROM glucose_entries ORDER BY timestampMillis DESC")
    fun observeGlucose(): Flow<List<GlucoseEntry>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertEye(entry: EyeEntry): Long

    @Query("SELECT * FROM eye_entries ORDER BY timestampMillis DESC")
    fun observeEye(): Flow<List<EyeEntry>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMedication(entry: Medication): Long

    @Update
    suspend fun updateMedication(entry: Medication)

    @Query("SELECT * FROM medications ORDER BY active DESC, name ASC")
    fun observeMedications(): Flow<List<Medication>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertMedicationIntake(entry: MedicationIntake): Long

    @Query("SELECT * FROM medication_intakes ORDER BY timestampMillis DESC")
    fun observeMedicationIntakes(): Flow<List<MedicationIntake>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSymptom(entry: SymptomEntry): Long

    @Query("SELECT * FROM symptom_entries ORDER BY timestampMillis DESC")
    fun observeSymptoms(): Flow<List<SymptomEntry>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertLab(entry: LabEntry): Long

    @Query("SELECT * FROM lab_entries ORDER BY timestampMillis DESC")
    fun observeLabs(): Flow<List<LabEntry>>
}
