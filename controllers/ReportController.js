const ReportService = require("../services/ReportService");

exports.createReportTable = async (req, res) => {
  try {
    await ReportService.createReportTable();
    res.json({ status: "success", message: "ReportTable updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllReports = async (req, res) => {
  try {
    const reports = await ReportService.getAllReports();
    res.json({ data: reports, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReportsByDate = async (req, res) => {
  try {
    const date = req.query.date;

    if (!date) {
      return res.status(400).json({ status: 'error', message: 'Date parameter is required.' });
    }

    const reports = await ReportService.getReportsByDate(date);
    res.json({ data: reports, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await ReportService.getReportById(reportId);

    if (!report) {
      return res.status(404).json({ status: "error", message: "Report not found" });
    }

    res.json({ data: report, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    const deletedReport = await ReportService.deleteReport(reportId);

    if (!deletedReport) {
      return res.status(404).json({ status: "error", message: "Report not found" });
    }

    res.json({ data: deletedReport, status: "success", message: "Report deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
