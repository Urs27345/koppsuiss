package com.saluturs

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import com.saluturs.data.HealthRepository
import com.saluturs.data.SalutDatabase
import com.saluturs.ui.SalutUrsApp
import com.saluturs.viewmodel.MainViewModel
import com.saluturs.viewmodel.MainViewModelFactory

class MainActivity : ComponentActivity() {
    private val viewModel: MainViewModel by viewModels {
        val database = SalutDatabase.get(applicationContext)
        MainViewModelFactory(HealthRepository(database.healthDao()))
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SalutUrsApp(viewModel = viewModel)
        }
    }
}
