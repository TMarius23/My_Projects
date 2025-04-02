namespace Model_4
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.gestiunea_unui_restaurantDataSet = new Model_4.Gestiunea_unui_restaurantDataSet();
            this.cOMPOZITIEBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.cOMPOZITIETableAdapter = new Model_4.Gestiunea_unui_restaurantDataSetTableAdapters.COMPOZITIETableAdapter();
            this.fURNIZORIBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.fURNIZORITableAdapter = new Model_4.Gestiunea_unui_restaurantDataSetTableAdapters.FURNIZORITableAdapter();
            this.mENIURIBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.mENIURITableAdapter = new Model_4.Gestiunea_unui_restaurantDataSetTableAdapters.MENIURITableAdapter();
            this.pREPARATEBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.pREPARATETableAdapter = new Model_4.Gestiunea_unui_restaurantDataSetTableAdapters.PREPARATETableAdapter();
            this.rESTAURANTEBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.rESTAURANTETableAdapter = new Model_4.Gestiunea_unui_restaurantDataSetTableAdapters.RESTAURANTETableAdapter();
            this.sTOCURIBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.sTOCURITableAdapter = new Model_4.Gestiunea_unui_restaurantDataSetTableAdapters.STOCURITableAdapter();
            this.fontDialog1 = new System.Windows.Forms.FontDialog();
            this.process1 = new System.Diagnostics.Process();
            this.contextMenuStrip1 = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.pageSetupDialog1 = new System.Windows.Forms.PageSetupDialog();
            this.backgroundWorker1 = new System.ComponentModel.BackgroundWorker();
            this.tabPage1 = new System.Windows.Forms.TabPage();
            this.label2 = new System.Windows.Forms.Label();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.button1 = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.PaginaControl = new System.Windows.Forms.TabControl();
            ((System.ComponentModel.ISupportInitialize)(this.gestiunea_unui_restaurantDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.cOMPOZITIEBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.fURNIZORIBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.mENIURIBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pREPARATEBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.rESTAURANTEBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.sTOCURIBindingSource)).BeginInit();
            this.tabPage1.SuspendLayout();
            this.PaginaControl.SuspendLayout();
            this.SuspendLayout();
            // 
            // gestiunea_unui_restaurantDataSet
            // 
            this.gestiunea_unui_restaurantDataSet.DataSetName = "Gestiunea_unui_restaurantDataSet";
            this.gestiunea_unui_restaurantDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // cOMPOZITIEBindingSource
            // 
            this.cOMPOZITIEBindingSource.DataMember = "COMPOZITIE";
            this.cOMPOZITIEBindingSource.DataSource = this.gestiunea_unui_restaurantDataSet;
            // 
            // cOMPOZITIETableAdapter
            // 
            this.cOMPOZITIETableAdapter.ClearBeforeFill = true;
            // 
            // fURNIZORIBindingSource
            // 
            this.fURNIZORIBindingSource.DataMember = "FURNIZORI";
            this.fURNIZORIBindingSource.DataSource = this.gestiunea_unui_restaurantDataSet;
            // 
            // fURNIZORITableAdapter
            // 
            this.fURNIZORITableAdapter.ClearBeforeFill = true;
            // 
            // mENIURIBindingSource
            // 
            this.mENIURIBindingSource.DataMember = "MENIURI";
            this.mENIURIBindingSource.DataSource = this.gestiunea_unui_restaurantDataSet;
            // 
            // mENIURITableAdapter
            // 
            this.mENIURITableAdapter.ClearBeforeFill = true;
            // 
            // pREPARATEBindingSource
            // 
            this.pREPARATEBindingSource.DataMember = "PREPARATE";
            this.pREPARATEBindingSource.DataSource = this.gestiunea_unui_restaurantDataSet;
            // 
            // pREPARATETableAdapter
            // 
            this.pREPARATETableAdapter.ClearBeforeFill = true;
            // 
            // rESTAURANTEBindingSource
            // 
            this.rESTAURANTEBindingSource.DataMember = "RESTAURANTE";
            this.rESTAURANTEBindingSource.DataSource = this.gestiunea_unui_restaurantDataSet;
            // 
            // rESTAURANTETableAdapter
            // 
            this.rESTAURANTETableAdapter.ClearBeforeFill = true;
            // 
            // sTOCURIBindingSource
            // 
            this.sTOCURIBindingSource.DataMember = "STOCURI";
            this.sTOCURIBindingSource.DataSource = this.gestiunea_unui_restaurantDataSet;
            // 
            // sTOCURITableAdapter
            // 
            this.sTOCURITableAdapter.ClearBeforeFill = true;
            // 
            // process1
            // 
            this.process1.StartInfo.Domain = "";
            this.process1.StartInfo.LoadUserProfile = false;
            this.process1.StartInfo.Password = null;
            this.process1.StartInfo.StandardErrorEncoding = null;
            this.process1.StartInfo.StandardOutputEncoding = null;
            this.process1.StartInfo.UserName = "";
            this.process1.SynchronizingObject = this;
            // 
            // contextMenuStrip1
            // 
            this.contextMenuStrip1.Name = "contextMenuStrip1";
            this.contextMenuStrip1.Size = new System.Drawing.Size(61, 4);
            // 
            // tabPage1
            // 
            this.tabPage1.BackColor = System.Drawing.Color.MediumSlateBlue;
            this.tabPage1.Controls.Add(this.label2);
            this.tabPage1.Controls.Add(this.textBox1);
            this.tabPage1.Controls.Add(this.button1);
            this.tabPage1.Controls.Add(this.label1);
            this.tabPage1.ForeColor = System.Drawing.Color.Black;
            this.tabPage1.Location = new System.Drawing.Point(4, 22);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage1.Size = new System.Drawing.Size(642, 458);
            this.tabPage1.TabIndex = 0;
            this.tabPage1.Text = "tabPage1";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Brush Script MT", 20.25F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Italic))), System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.ForeColor = System.Drawing.Color.Chartreuse;
            this.label2.Location = new System.Drawing.Point(8, 417);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(159, 33);
            this.label2.TabIndex = 6;
            this.label2.Text = "Parola: admin";
            // 
            // textBox1
            // 
            this.textBox1.BackColor = System.Drawing.Color.Black;
            this.textBox1.Font = new System.Drawing.Font("Brush Script MT", 26.25F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Italic))), System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textBox1.ForeColor = System.Drawing.Color.White;
            this.textBox1.ImeMode = System.Windows.Forms.ImeMode.Disable;
            this.textBox1.Location = new System.Drawing.Point(205, 146);
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(184, 50);
            this.textBox1.TabIndex = 5;
            // 
            // button1
            // 
            this.button1.BackColor = System.Drawing.Color.OrangeRed;
            this.button1.Font = new System.Drawing.Font("Brush Script MT", 26.25F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Italic))), System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.button1.ForeColor = System.Drawing.Color.Black;
            this.button1.Location = new System.Drawing.Point(227, 248);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(141, 75);
            this.button1.TabIndex = 2;
            this.button1.Text = "Logare";
            this.button1.UseVisualStyleBackColor = false;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.BackColor = System.Drawing.Color.OrangeRed;
            this.label1.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
            this.label1.Font = new System.Drawing.Font("Brush Script MT", 36F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Italic))), System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.SystemColors.ControlText;
            this.label1.Location = new System.Drawing.Point(227, 28);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(141, 61);
            this.label1.TabIndex = 1;
            this.label1.Text = "Parola";
            // 
            // PaginaControl
            // 
            this.PaginaControl.Controls.Add(this.tabPage1);
            this.PaginaControl.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.PaginaControl.ImeMode = System.Windows.Forms.ImeMode.Disable;
            this.PaginaControl.Location = new System.Drawing.Point(0, -25);
            this.PaginaControl.Name = "PaginaControl";
            this.PaginaControl.SelectedIndex = 0;
            this.PaginaControl.Size = new System.Drawing.Size(650, 484);
            this.PaginaControl.TabIndex = 2;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(647, 456);
            this.Controls.Add(this.PaginaControl);
            this.ForeColor = System.Drawing.SystemColors.Info;
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterParent;
            this.Text = "Logare";
            this.TransparencyKey = System.Drawing.Color.White;
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.gestiunea_unui_restaurantDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.cOMPOZITIEBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.fURNIZORIBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.mENIURIBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pREPARATEBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.rESTAURANTEBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.sTOCURIBindingSource)).EndInit();
            this.tabPage1.ResumeLayout(false);
            this.tabPage1.PerformLayout();
            this.PaginaControl.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private Gestiunea_unui_restaurantDataSet gestiunea_unui_restaurantDataSet;
        private System.Windows.Forms.BindingSource cOMPOZITIEBindingSource;
        private Gestiunea_unui_restaurantDataSetTableAdapters.COMPOZITIETableAdapter cOMPOZITIETableAdapter;
        private System.Windows.Forms.BindingSource fURNIZORIBindingSource;
        private Gestiunea_unui_restaurantDataSetTableAdapters.FURNIZORITableAdapter fURNIZORITableAdapter;
        private System.Windows.Forms.BindingSource mENIURIBindingSource;
        private Gestiunea_unui_restaurantDataSetTableAdapters.MENIURITableAdapter mENIURITableAdapter;
        private System.Windows.Forms.BindingSource pREPARATEBindingSource;
        private Gestiunea_unui_restaurantDataSetTableAdapters.PREPARATETableAdapter pREPARATETableAdapter;
        private System.Windows.Forms.BindingSource rESTAURANTEBindingSource;
        private Gestiunea_unui_restaurantDataSetTableAdapters.RESTAURANTETableAdapter rESTAURANTETableAdapter;
        private System.Windows.Forms.BindingSource sTOCURIBindingSource;
        private Gestiunea_unui_restaurantDataSetTableAdapters.STOCURITableAdapter sTOCURITableAdapter;
        private System.Windows.Forms.FontDialog fontDialog1;
        private System.Diagnostics.Process process1;
        private System.Windows.Forms.ContextMenuStrip contextMenuStrip1;
        private System.Windows.Forms.PageSetupDialog pageSetupDialog1;
        private System.ComponentModel.BackgroundWorker backgroundWorker1;
        private System.Windows.Forms.TabControl PaginaControl;
        private System.Windows.Forms.TabPage tabPage1;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox textBox1;
    }
}

