const ReportTable = require("../models/reportTable");
const MainTable = require("../models/mainTable");

exports.createReportTable = async () => {
    try {
        // Fetch data from the MainTable for each clinic
        const clinic1Data = await this.fetchClinicData('אחר');
        const clinic2Data = await this.fetchClinicData('כללית');
        const clinic3Data = await this.fetchClinicData('לאומית');
        const clinic4Data = await this.fetchClinicData('מאוחדת');
        const clinic5Data = await this.fetchClinicData('מכבי');

        // Calculate the number of patients for each clinic
        const clinic1 = this.calculateClinicPatients(clinic1Data);
        const clinic2 = this.calculateClinicPatients(clinic2Data);
        const clinic3 = this.calculateClinicPatients(clinic3Data);
        const clinic4 = this.calculateClinicPatients(clinic4Data);
        const clinic5 = this.calculateClinicPatients(clinic5Data);

        // Calculate the total number of patients
        const patientsAmount = this.calculateTotalPatients([clinic1, clinic2, clinic3, clinic4, clinic5]);
        let date_ob = new Date();
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let day = ("0" + date_ob.getDate()).slice(-2);

        // prints date in YYYY-MM-DD format
        const date = day + "-" + month + "-" + year;
        // Update or create a new entry in the ReportTable
        await this.createReport({
            date,
            clinic1,
            clinic2,
            clinic3,
            clinic4,
            clinic5,
            patientsAmount,
        });
        
    } catch (error) {
        console.error('Error updating ReportTable:', error);
    }
};

exports.fetchClinicData = async (clinic) => {

    return MainTable.find({ clinic });
};

exports.calculateClinicPatients = (clinicData) => {

    return clinicData.length;
};

exports.calculateTotalPatients = (clinicPatients) => {

    return clinicPatients.reduce((total, patients) => total + patients, 0);
};



exports.getReportById = async (id) => {
    return ReportTable.findById({ _id: id });
};

exports.deleteReport = async (id) => {

    return ReportTable.findOneAndDelete({ _id: id });
};


exports.getAllReports = async () => {
    return ReportTable.find();
};

exports.createReport = async (data) => {
    try {
        let date_ob = new Date();
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let date = ("0" + date_ob.getDate()).slice(-2);

        // prints date in YYYY-MM-DD format
        const dateOnly = date + "-" + month + "-" + year;
        const existingReport = await ReportTable.findOne({ date: dateOnly });

        if (existingReport) {
            // If a report with the given date already exists, update its values
            await ReportTable.findOneAndUpdate({ date: dateOnly }, {
                clinic1: data.clinic1,
                clinic2: data.clinic2,
                clinic3: data.clinic3,
                clinic4: data.clinic4,
                clinic5: data.clinic5,
                patientsAmount: data.patientsAmount,
            });
        } else {
            // If no report with the given date exists, create a new one
            await ReportTable.create({ ...data, date: dateOnly });
        }

        console.log('ReportTable updated successfully.');
    } catch (error) {
        throw new Error(`Error updating ReportTable: ${error.message}`);
    }
};


exports.getReportsByDate = async (date) => {
    // Assuming date is in the format 'YYYY-MM-DD'
    let date_ob = new Date();
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // prints date in YYYY-MM-DD format
    const dateOnly = year + "-" + month + "-" + hours;
    const reports = await ReportTable.find({
        date: { dateOnly }
    });

    // If you want to compare only the year, month, and day, filter the results
    const filteredReports = reports.map(report => ({
        ...report.toObject(),
        date: new Date(report.date.toISOString().split('T')[0])
    }));

    return filteredReports;
};