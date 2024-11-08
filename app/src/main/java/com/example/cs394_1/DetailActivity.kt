package com.example.cs394_1

import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class DetailActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail)

        // Intent'ten gelen verileri al
        val id = intent.getStringExtra("id") ?: "N/A"
        val firstName = intent.getStringExtra("firstName") ?: "N/A"
        val lastName = intent.getStringExtra("lastName") ?: "N/A"
        val email = intent.getStringExtra("email") ?: "N/A"
        val gender = intent.getStringExtra("gender") ?: "N/A"
        val ipAddress = intent.getStringExtra("ipAddress") ?: "N/A"

        // TextView'leri bul ve verileri ayarla
        findViewById<TextView>(R.id.detailId).text = "ID: $id"
        findViewById<TextView>(R.id.detailFirstName).text = "First Name: $firstName"
        findViewById<TextView>(R.id.detailLastName).text = "Last Name: $lastName"
        findViewById<TextView>(R.id.detailEmail).text = "Email: $email"
        findViewById<TextView>(R.id.detailGender).text = "Gender: $gender"
        findViewById<TextView>(R.id.detailIpAddress).text = "IP Address: $ipAddress"
    }
}