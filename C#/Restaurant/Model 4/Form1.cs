using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace Model_4
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

            gestiunea_unui_restaurantDataSet.EnforceConstraints = false;
        }
        
        private void button1_Click(object sender, EventArgs e)
        {
            
            string s = textBox1.Text;
            if (s == "admin")
            {
                Form2 f2 = new Form2();
                f2.Show();
                this.Hide();
            }
            else
                MessageBox.Show("Parola incorecta");
             
        }

    }
}
