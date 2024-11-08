package com.example.cs394_1
import android.content.Context
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.cs394_1.ItemAdapter
import com.example.cs394_1.R
import java.io.BufferedReader
import java.io.InputStreamReader

fun loadCSVFromAsset(context: Context): List<Item> {
    val itemList = mutableListOf<Item>()
    try {
        val inputStream = context.assets.open("MOCK_DATA.csv")
        val bufferedReader = BufferedReader(InputStreamReader(inputStream))
        var line: String? = bufferedReader.readLine() // İlk satır başlık olabilir

        while (line != null) {
            val tokens = line.split(",")
            if (tokens.size >= 6) { // En az altı sütun varsa
                val id = tokens[0]
                val firstName = tokens[1]
                val lastName = tokens[2]
                val email = tokens[3]
                val gender = tokens[4]
                val ipAddress = tokens[5]
                itemList.add(Item(id, firstName, lastName, email, gender, ipAddress))
            }
            line = bufferedReader.readLine()
        }
    } catch (e: Exception) {
        e.printStackTrace()
    }
    return itemList
}



class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // CSV dosyasından veri yükle
        val itemList = loadCSVFromAsset(this)

        // RecyclerView'i bul ve ayarla
        val recyclerView: RecyclerView = findViewById(R.id.recyclerView)
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = ItemAdapter(itemList)
    }

}