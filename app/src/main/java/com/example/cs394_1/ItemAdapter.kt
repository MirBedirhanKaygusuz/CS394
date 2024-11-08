package com.example.cs394_1
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.cs394_1.R

data class Item(
    val id: String,
    val firstName: String,
    val lastName: String,
    val email: String,
    val gender: String,
    val ipAddress: String
)
class ItemAdapter(private val itemList: List<Item>) : RecyclerView.Adapter<ItemAdapter.ViewHolder>() {

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val title: TextView = itemView.findViewById(R.id.itemTitle)
        val description: TextView = itemView.findViewById(R.id.itemDescription)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_layout, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = itemList[position]
        holder.title.text = item.firstName
        holder.description.text = item.email

        holder.itemView.setOnClickListener {
            val intent = Intent(it.context, DetailActivity::class.java)
            intent.putExtra("id", item.id)
            intent.putExtra("firstName", item.firstName)
            intent.putExtra("lastName", item.lastName)
            intent.putExtra("email", item.email)
            intent.putExtra("gender", item.gender)
            intent.putExtra("ipAddress", item.ipAddress)
            it.context.startActivity(intent)
        }
    }


    override fun getItemCount(): Int = itemList.size
}
