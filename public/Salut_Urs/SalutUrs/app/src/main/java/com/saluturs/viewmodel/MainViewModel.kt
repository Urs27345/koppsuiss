package com.saluturs.viewmodel

import android.graphics.Bitmap
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.saluturs.data.*
import com.saluturs.ocr.BloodPressureOcr
import com.saluturs.ocr.BloodPressureOcrResult
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class MainViewModel(private val repository: HealthRepository) : ViewModel() {
    private val ocr = BloodPressureOcr()

    val bloodPressure: StateFlow<List<BloodPressureEntry>> = repository.bloodPressure
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())
    val weights: StateFlow<List<WeightEntry>> = repository.weights
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())
    val glucose: StateFlow<List<GlucoseEntry>> = repository.glucose
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())
    val eyes: StateFlow<List<EyeEntry>> = repository.eyes
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())
    val medications: StateFlow<List<Medication>> = repository.medications
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    fun addBloodPressure(entry: BloodPressureEntry) {
        viewModelScope.launch { repository.addBloodPressure(entry) }
    }

    fun addWeight(entry: WeightEntry) {
        viewModelScope.launch { repository.addWeight(entry) }
    }

    fun addGlucose(entry: GlucoseEntry) {
        viewModelScope.launch { repository.addGlucose(entry) }
    }

    fun addEye(entry: EyeEntry) {
        viewModelScope.launch { repository.addEye(entry) }
    }

    fun addMedication(entry: Medication) {
        viewModelScope.launch { repository.addMedication(entry) }
    }

    fun readBloodPressureFromBitmap(bitmap: Bitmap, onResult: (BloodPressureOcrResult) -> Unit, onError: (String) -> Unit) {
        viewModelScope.launch {
            try {
                onResult(ocr.read(bitmap))
            } catch (e: Exception) {
                onError(e.message ?: "OCR konnte das Foto nicht lesen")
            }
        }
    }
}

class MainViewModelFactory(private val repository: HealthRepository) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(MainViewModel::class.java)) {
            return MainViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
