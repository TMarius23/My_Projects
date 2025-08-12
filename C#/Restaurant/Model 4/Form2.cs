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
    public partial class Form2 : Form
    {
        public Form2()
        {
            InitializeComponent();
        }

        private void Form2_Load(object sender, EventArgs e)
        {
            gestiunea_unui_restaurantDataSet.EnforceConstraints = false;
        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage2;

            textBox1.Clear();

            int x = 2;
            rESTAURANTETableAdapter.Afisare_date_restaurant_x(gestiunea_unui_restaurantDataSet.RESTAURANTE,x);

            DataTable dt = gestiunea_unui_restaurantDataSet.RESTAURANTE;

            textBox1.Text +="Denumire:"+dt.Rows[0]["Denumire"].ToString() + "Locatie:"+dt.Rows[0]["Locatie"].ToString() + "Numar locuri disponibile:"+dt.Rows[0]["Numar_locuri_disp"].ToString();

        }

        private void button4_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage1;
        }

        private void button5_ClicSk(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button6_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage2;
        }

        private void button7_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button8_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage3;
        }

        private void button12_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage4;

            int x = 1;
            sTOCURITableAdapter.Afisare_tot_x(gestiunea_unui_restaurantDataSet.STOCURI,x);

            DataTable dt = gestiunea_unui_restaurantDataSet.STOCURI;

            dataGridView1.DataSource = dt;
        

        }
                                
         private void button17_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage3;
        }

         private void button18_Click(object sender, EventArgs e)
         {
             Application.Exit();
         }

        private void button13_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage5;

            int x = 1;
            sTOCURITableAdapter.Alimente_depozit_subb10kg(gestiunea_unui_restaurantDataSet.STOCURI, x);

            DataTable dt = gestiunea_unui_restaurantDataSet.STOCURI;

            dataGridView2.DataSource=dt;

        }

        private void button19_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage3;
        }

        private void button20_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button14_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage6;


            int x = 1;
            sTOCURITableAdapter.Termen_expirare_mic5(gestiunea_unui_restaurantDataSet.STOCURI,x);

            DataTable dt = gestiunea_unui_restaurantDataSet.STOCURI;

            dataGridView3.DataSource = dt;
        }

        private void button21_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage3;
        }

        private void button22_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button23_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage3;
        }

        private void button24_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button15_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage7;

            int x = 1;
            sTOCURITableAdapter.Pret_desc_achizitie(gestiunea_unui_restaurantDataSet.STOCURI,x);

            DataTable dt = gestiunea_unui_restaurantDataSet.STOCURI;

            dataGridView3.DataSource = dt;
        }

        private void button25_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage2;
        }

        private void button26_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }


        private void button16_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage8;
        }

        private void button9_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage8;

            fURNIZORITableAdapter.Afisare_furnizori(gestiunea_unui_restaurantDataSet.FURNIZORI);

            DataTable dt=gestiunea_unui_restaurantDataSet.FURNIZORI;

            dataGridView5.DataSource = dt;

        }

        private void button16_Click_1(object sender, EventArgs e)
        {

            string ids = textBox2.Text;
            int id = int.Parse(ids);
            string den = textBox3.Text, ema = textBox5.Text, tel = textBox4.Text;

           /// int x = 1;
            fURNIZORITableAdapter.Inserare_furnizor(id, den, tel, ema);

            DataTable dt = gestiunea_unui_restaurantDataSet.FURNIZORI;

           

            dataGridView5.DataSource = dt;

            dataGridView5.Refresh();
            dataGridView5.Update();

            textBox2.Clear();
            textBox3.Clear();
            textBox4.Clear();
            textBox5.Clear();

        }

        private void button27_Click(object sender, EventArgs e)
        {
            string s = textBox3.Text;
            fURNIZORITableAdapter.Stergere_furnizor(s);

            DataTable dt = gestiunea_unui_restaurantDataSet.FURNIZORI;

            dataGridView5.DataSource = dt;

            dataGridView5.Refresh();
            dataGridView5.Update();

            textBox2.Clear();
            textBox3.Clear();
            textBox4.Clear();
            textBox5.Clear();

        }

        private void button28_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage2;
        }

        private void button29_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void label11_Click(object sender, EventArgs e)
        {

        }

        private void button30_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage10;

            richTextBox2.Clear();

            mENIURITableAdapter.Comparare_preturi_restaurant(gestiunea_unui_restaurantDataSet.MENIURI);

            DataTable dt = gestiunea_unui_restaurantDataSet.MENIURI;

            string x = "    ";
            for (int i = 0; i < dt.Rows.Count; i++)
                richTextBox2.Text += dt.Rows[i]["Denumire_Principala"].ToString() + x.ToString() +
                    dt.Rows[i]["Suma_preturi"].ToString() + x.ToString() +
                    dt.Rows[i]["Denumire"].ToString() +'\n';

        }

        private void button10_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage9;

            richTextBox1.Clear();

            int y = 1;
            mENIURITableAdapter.Afisare_preparat_cat_x(gestiunea_unui_restaurantDataSet.MENIURI, y);

            DataTable dt = gestiunea_unui_restaurantDataSet.MENIURI;

            string x = "    ";

            for (int i = 0; i < dt.Rows.Count; i++)
                richTextBox1.Text += dt.Rows[i]["Denumire_Principala"].ToString() + x.ToString() +
                    dt.Rows[i]["Denumire"].ToString() + x.ToString() +
                    dt.Rows[i]["Cantitate"].ToString() + x.ToString()+ 
                    dt.Rows[i]["Pret"].ToString() + '\n';



        }

        private void button32_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button31_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage9;
        }

        private void button11_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage11;

            int x = 2;
            pREPARATETableAdapter.Afisare_x(gestiunea_unui_restaurantDataSet.PREPARATE, x);

            DataTable dt = gestiunea_unui_restaurantDataSet.PREPARATE;

            string y = "     ";
            for (int i = 0; i < dt.Rows.Count; i++)
                richTextBox4.Text += dt.Rows[i]["idP"].ToString() + y.ToString() + dt.Rows[i]["Denumire"].ToString() +
                    dt.Rows[i]["Cantitate"].ToString() + y.ToString() + y.ToString() + y.ToString() + dt.Rows[i]["Pret"].ToString() + '\n';

            
            richTextBox4.Refresh();
            richTextBox4.Update();

        }

        private void button35_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void tabPage11_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage2;
        }

        private void button33_Click(object sender, EventArgs e)
        {

            tabControl1.SelectedTab = tabPage12;

            richTextBox3.Clear();

          
            int s1 = int.Parse(textBox6.Text);
            string s = textBox7.Text;
           

            cOMPOZITIETableAdapter.Compozitie_preparat(gestiunea_unui_restaurantDataSet.COMPOZITIE, s, s1);


            DataTable dt = gestiunea_unui_restaurantDataSet.COMPOZITIE;


            string x = "    ";

            for (int i = 0; i < dt.Rows.Count; i++)
                richTextBox3.Text += dt.Rows[i]["Denumire"].ToString() + x.ToString() +
                    dt.Rows[i]["Denumire_aliment"].ToString() + x.ToString() +
                    dt.Rows[i]["Cantitate_aliment"].ToString() + '\n';



        }

        private void button37_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage11;
        }

        private void button38_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button36_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage13;

            /*
            string s = textBox7.Text;
            int s1 = int.Parse(textBox8.Text);

            cOMPOZITIETableAdapter.Reactualizare_cantitate_comp(gestiunea_unui_restaurantDataSet.COMPOZITIE, s, s1);

            DataTable dt = gestiunea_unui_restaurantDataSet.COMPOZITIE;


            string x = "    ";

            for (int i = 0; i < dt.Rows.Count; i++)
                richTextBox1.Text += dt.Rows[i]["Denumire"].ToString() + x.ToString() +
                    dt.Rows[i]["Denumire_aliment"].ToString() + x.ToString() +
                    dt.Rows[i]["Cantitate_aliment"].ToString() + '\n';
             * 
             */
        }

        private void button41_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage11;


            richTextBox4.Clear();

            int x = 2;
            pREPARATETableAdapter.Afisare_x(gestiunea_unui_restaurantDataSet.PREPARATE, x);

            DataTable dt = gestiunea_unui_restaurantDataSet.PREPARATE;

            string y = "     ";
            for (int i = 0; i < dt.Rows.Count; i++)
                richTextBox4.Text += dt.Rows[i]["idP"].ToString() + y.ToString() + dt.Rows[i]["Denumire"].ToString() +
                    dt.Rows[i]["Cantitate"].ToString() + y.ToString() + y.ToString() + y.ToString() + dt.Rows[i]["Pret"].ToString() + '\n';

            
            textBox8.Clear();
            textBox9.Clear();

            ///DataTable dt1; 
            ///dataGridView12.DataSource = dt1;
        }

        private void button42_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button39_Click(object sender, EventArgs e)
        {
         
            int s1 = int.Parse(textBox25.Text);
            string s2 = textBox24.Text;
            float s = float.Parse(textBox18.Text);

            cOMPOZITIETableAdapter.Reactualizare_cantitate_comp(s, s2, s1);


            string s3 = textBox9.Text;
            int s4 = int.Parse(textBox8.Text);



            cOMPOZITIETableAdapter.Compozitie_preparat(gestiunea_unui_restaurantDataSet.COMPOZITIE, s3, s4);

            DataTable dt1 = gestiunea_unui_restaurantDataSet.COMPOZITIE;

            dataGridView11.DataSource = dt1;


            textBox25.Clear();
            textBox24.Clear();
            textBox18.Clear();

            ///textBox19.Clear();
            ///textBox20.Clear();
           

        }

        private void button34_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage2;
            richTextBox4.Clear();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage14;

            textBox11.Clear();

            ///aici
            int x = 1;
            rESTAURANTETableAdapter.Afisare_date_restaurant_x(gestiunea_unui_restaurantDataSet.RESTAURANTE, x);

            DataTable dt = gestiunea_unui_restaurantDataSet.RESTAURANTE;

            textBox11.Text += "Denumire:" + dt.Rows[0]["Denumire"].ToString() + "Locatie:" + dt.Rows[0]["Locatie"].ToString() + "Numar locuri disponibile:" + dt.Rows[0]["Numar_locuri_disp"].ToString();



        }

        private void button48_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage1;
        }

        private void button47_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button46_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage15;
        }

        private void button54_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage14;
        }

        private void button53_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button52_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage16;

            int x = 2;
            sTOCURITableAdapter.Afisare_tot_x(gestiunea_unui_restaurantDataSet.STOCURI,x);

            DataTable dt = gestiunea_unui_restaurantDataSet.STOCURI;

            dataGridView6.DataSource = dt;
        }

        private void button56_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage15;
        }

        private void button55_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button58_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage15;
        }

        private void button57_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button60_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage15;
        }

        private void button59_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button62_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage15;
        }

        private void button61_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button49_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage17;

            int x = 2;
            sTOCURITableAdapter.Pret_desc_achizitie(gestiunea_unui_restaurantDataSet.STOCURI, x);

            DataTable dt = gestiunea_unui_restaurantDataSet.STOCURI;

            dataGridView8.DataSource = dt;

        }

        private void button51_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage18;


            int x = 2;
            sTOCURITableAdapter.Alimente_depozit_subb10kg(gestiunea_unui_restaurantDataSet.STOCURI, x);

            DataTable dt = gestiunea_unui_restaurantDataSet.STOCURI;

            dataGridView7.DataSource = dt;
        }

        private void button50_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage19;

            int x = 2;
            sTOCURITableAdapter.Termen_expirare_mic5(gestiunea_unui_restaurantDataSet.STOCURI, x);

            DataTable dt = gestiunea_unui_restaurantDataSet.STOCURI;

            dataGridView9.DataSource = dt;

        }

        private void button66_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage14;
        }

        private void button65_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button64_Click(object sender, EventArgs e)
        {
            string ids = textBox15.Text;
            int id = int.Parse(ids);
            string den = textBox14.Text, ema = textBox12.Text, tel = textBox13.Text;

            /// int x = 1;
            fURNIZORITableAdapter.Inserare_furnizor(id, den, tel, ema);

            DataTable dt = gestiunea_unui_restaurantDataSet.FURNIZORI;



            dataGridView10.DataSource = dt;

            dataGridView10.Refresh();
            dataGridView10.Update();

            textBox15.Clear();
            textBox13.Clear();
            textBox14.Clear();
            textBox12.Clear();

        }

        private void button43_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage20;

            fURNIZORITableAdapter.Afisare_furnizori(gestiunea_unui_restaurantDataSet.FURNIZORI);

            DataTable dt = gestiunea_unui_restaurantDataSet.FURNIZORI;

            dataGridView10.DataSource = dt;
        }

        private void button63_Click(object sender, EventArgs e)
        {
            string s = textBox14.Text;
            fURNIZORITableAdapter.Stergere_furnizor(s);

            DataTable dt = gestiunea_unui_restaurantDataSet.FURNIZORI;

            dataGridView10.DataSource = dt;

            dataGridView10.Refresh();
            dataGridView10.Update();

            textBox12.Clear();
            textBox13.Clear();
            textBox14.Clear();
            textBox15.Clear();
        }

        private void button45_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage21;

            richTextBox5.Clear();

            int y = 2;
            mENIURITableAdapter.Afisare_preparat_cat_x(gestiunea_unui_restaurantDataSet.MENIURI, y);

            DataTable dt = gestiunea_unui_restaurantDataSet.MENIURI;

            string x = "    ";

            for (int i = 0; i < dt.Rows.Count; i++)
                richTextBox5.Text += dt.Rows[i]["Denumire_Principala"].ToString() + x.ToString() +
                    dt.Rows[i]["Denumire"].ToString() + x.ToString() +
                    dt.Rows[i]["Cantitate"].ToString() + x.ToString() +
                    dt.Rows[i]["Pret"].ToString() + '\n';


        }

        private void button67_Click(object sender, EventArgs e)
        {

            tabControl1.SelectedTab = tabPage22;

            richTextBox6.Clear();

            mENIURITableAdapter.Comparare_preturi_restaurant(gestiunea_unui_restaurantDataSet.MENIURI);

            DataTable dt = gestiunea_unui_restaurantDataSet.MENIURI;

            string x = "    ";
            for (int i = 0; i < dt.Rows.Count; i++)
                richTextBox6.Text += dt.Rows[i]["Denumire_Principala"].ToString() + x.ToString() +
                    dt.Rows[i]["Suma_preturi"].ToString() + x.ToString() +
                    dt.Rows[i]["Denumire"].ToString() + '\n';

        }

        private void button69_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage14;
        }

        private void button71_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage21;
        }

        private void button68_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button70_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button44_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage23;

            
            int x = 1;
            pREPARATETableAdapter.Afisare_x(gestiunea_unui_restaurantDataSet.PREPARATE, x);

            DataTable dt = gestiunea_unui_restaurantDataSet.PREPARATE;

            string y = "     ";
            for (int i = 0; i < dt.Rows.Count; i++)
                richTextBox7.Text += dt.Rows[i]["idP"].ToString() + y.ToString() + dt.Rows[i]["Denumire"].ToString() +
                    dt.Rows[i]["Cantitate"].ToString() + y.ToString() + y.ToString() + y.ToString() + dt.Rows[i]["Pret"].ToString() + '\n';

            richTextBox7.Refresh();
            richTextBox7.Update();
            
           
        }

        private void button74_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage14;
            richTextBox7.Clear();
        }

        private void button73_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button77_Click(object sender, EventArgs e)
        {
            richTextBox7.Clear();
            tabControl1.SelectedTab = tabPage23;

            int x = 1;
            pREPARATETableAdapter.Afisare_x(gestiunea_unui_restaurantDataSet.PREPARATE, x);

            DataTable dt = gestiunea_unui_restaurantDataSet.PREPARATE;

            string y = "     ";
            for (int i = 0; i < dt.Rows.Count; i++)
                richTextBox7.Text += dt.Rows[i]["idP"].ToString() + y.ToString() + dt.Rows[i]["Denumire"].ToString() +
                    dt.Rows[i]["Cantitate"].ToString() + y.ToString() + y.ToString() + y.ToString() + dt.Rows[i]["Pret"].ToString() + '\n';


           
        }

        private void button76_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button75_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage24;

            richTextBox8.Clear();


            int s1 = int.Parse(textBox17.Text);
            string s = textBox16.Text;


            cOMPOZITIETableAdapter.Compozitie_preparat(gestiunea_unui_restaurantDataSet.COMPOZITIE, s, s1);


            DataTable dt = gestiunea_unui_restaurantDataSet.COMPOZITIE;


            string x = "    ";

            for (int i = 0; i < dt.Rows.Count; i++)
                richTextBox8.Text += dt.Rows[i]["Denumire"].ToString() + x.ToString() +
                    dt.Rows[i]["Denumire_aliment"].ToString() + x.ToString() +
                    dt.Rows[i]["Cantitate_aliment"].ToString() + '\n';

            textBox17.Clear();
            textBox16.Clear();
        }

        private void button72_Click(object sender, EventArgs e)
        {
            tabControl1.SelectedTab = tabPage25;
        }

        private void button81_Click(object sender, EventArgs e)
        {

            int s1 = int.Parse(textBox23.Text);
            string s2 = textBox22.Text;
            float s = float.Parse(textBox21.Text);

            cOMPOZITIETableAdapter.Reactualizare_cantitate_comp(s, s2, s1);

            
            string s3 = textBox19.Text;
            int s4 = int.Parse(textBox20.Text);

            

            cOMPOZITIETableAdapter.Compozitie_preparat(gestiunea_unui_restaurantDataSet.COMPOZITIE, s3, s4);

            DataTable dt1 = gestiunea_unui_restaurantDataSet.COMPOZITIE;

            dataGridView11.DataSource = dt1;


            textBox23.Clear();
            textBox22.Clear();
            textBox21.Clear();

            ///textBox19.Clear();
            ///textBox20.Clear();
           
        }

        private void button40_Click(object sender, EventArgs e)
        {
            int x = 1;
            pREPARATETableAdapter.Reactualizare_cantitate_preparat(x);

            
        }

        private void button80_Click(object sender, EventArgs e)
        {

            int s1 = 2;
            pREPARATETableAdapter.Reactualizare_cantitate_preparat(s1);

            DataTable dt = gestiunea_unui_restaurantDataSet.PREPARATE;
        }

        private void button79_Click(object sender, EventArgs e)
        {
            richTextBox7.Clear();
            tabControl1.SelectedTab = tabPage23;

            int x = 1;
            pREPARATETableAdapter.Afisare_x(gestiunea_unui_restaurantDataSet.PREPARATE, x);

            DataTable dt = gestiunea_unui_restaurantDataSet.PREPARATE;

            string y = "     ";
            for (int i = 0; i < dt.Rows.Count; i++)
                richTextBox7.Text += dt.Rows[i]["idP"].ToString() + y.ToString() + dt.Rows[i]["Denumire"].ToString() +
                    dt.Rows[i]["Cantitate"].ToString() + y.ToString() + y.ToString() + y.ToString() + dt.Rows[i]["Pret"].ToString() + '\n';

            textBox19.Clear();
            textBox20.Clear();
        }

        private void button78_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button82_Click(object sender, EventArgs e)
        {
            string s1 = textBox19.Text;
            int s2 = int.Parse(textBox20.Text);


            cOMPOZITIETableAdapter.Compozitie_preparat(gestiunea_unui_restaurantDataSet.COMPOZITIE, s1,s2);

            DataTable dt = gestiunea_unui_restaurantDataSet.COMPOZITIE;

            dataGridView11.DataSource = dt;

                
        }

        private void button83_Click(object sender, EventArgs e)
        {
            string s1 = textBox9.Text;
            int s2 = int.Parse(textBox8.Text);


            cOMPOZITIETableAdapter.Compozitie_preparat(gestiunea_unui_restaurantDataSet.COMPOZITIE, s1, s2);

            DataTable dt = gestiunea_unui_restaurantDataSet.COMPOZITIE;

            dataGridView12.DataSource = dt;
        }

        private void button5_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void tabPage13_Click(object sender, EventArgs e)
        {

        }
    }
}