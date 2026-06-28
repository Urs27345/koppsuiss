package com.saluturs.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

@Database(
    entities = [
        BloodPressureEntry::class,
        WeightEntry::class,
        GlucoseEntry::class,
        EyeEntry::class,
        Medication::class,
        MedicationIntake::class,
        SymptomEntry::class,
        LabEntry::class
    ],
    version = 1,
    exportSchema = false
)
abstract class SalutDatabase : RoomDatabase() {
    abstract fun healthDao(): HealthDao

    companion object {
        @Volatile private var INSTANCE: SalutDatabase? = null

        fun get(context: Context): SalutDatabase {
            return INSTANCE ?: synchronized(this) {
                INSTANCE ?: Room.databaseBuilder(
                    context.applicationContext,
                    SalutDatabase::class.java,
                    "salut_urs.db"
                ).build().also { INSTANCE = it }
            }
        }
    }
}
