import { Status } from "../types";
import { FaDownload } from "react-icons/fa";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
});

const ReportPDF = ({ statuses }: { statuses: Status[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Notification Status Report</Text>
      </View>
      {statuses.map((status, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.text}>Type: {status.type}</Text>
          <Text style={styles.text}>Recipient: {status.recipient}</Text>
          <Text style={styles.text}>Status: {status.status}</Text>
          <Text style={styles.text}>Date: {status.dateUpdated}</Text>
          {status.errorMessage && <Text style={styles.text}>Error: {status.errorMessage}</Text>}
        </View>
      ))}
    </Page>
  </Document>
);

export const ReportTable = ({ statuses }: { statuses: Status[] }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border rounded-lg shadow">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-3 text-left">Type</th>
          <th className="p-3 text-left">Recipient</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Date Updated</th>
          <th className="p-3 text-left">Error</th>
        </tr>
      </thead>
      <tbody>
        {statuses.map((status, index) => (
          <tr key={index} className="border-t">
            <td className="p-3">{status.type}</td>
            <td className="p-3">{status.recipient}</td>
            <td className="p-3">
              <span
                className={`px-2 py-1 rounded text-white ${
                  status.status === "delivered" || status.status === "read"
                    ? "bg-green-500"
                    : status.status === "sent"
                    ? "bg-blue-500"
                    : status.status === "failed"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {status.status}
              </span>
            </td>
            <td className="p-3">{new Date(status.dateUpdated).toLocaleString()}</td>
            <td className="p-3 text-red-500">{status.errorMessage || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="mt-4 flex justify-end">
      <PDFDownloadLink
        document={<ReportPDF statuses={statuses} />}
        fileName={`report-${statuses[0]?.dateUpdated.split("T")[0]}.pdf`}
        className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        {({ loading }) => (loading ? "Generating PDF..." : <><FaDownload className="mr-2" /> Download PDF</>)}
      </PDFDownloadLink>
    </div>
  </div>
);


// import { Status } from "../types";
// import { FaDownload } from "react-icons/fa";
// import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: { padding: 30 },
//   section: { marginBottom: 10 },
//   title: { fontSize: 18, marginBottom: 10 },
//   text: { fontSize: 12, marginBottom: 5 },
// });

// const ReportPDF = ({ statuses }: { statuses: Status[] }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text style={styles.title}>Notification Status Report</Text>
//       </View>
//       {statuses.map((status, index) => (
//         <View key={index} style={styles.section}>
//           <Text style={styles.text}>Type: {status.type}</Text>
//           <Text style={styles.text}>Recipient: {status.recipient}</Text>
//           <Text style={styles.text}>Status: {status.status}</Text>
//           <Text style={styles.text}>Date: {status.dateUpdated}</Text>
//           {status.errorMessage && <Text style={styles.text}>Error: {status.errorMessage}</Text>}
//         </View>
//       ))}
//     </Page>
//   </Document>
// );

// export const ReportTable = ({ statuses }: { statuses: Status[] }) => (
//   <div className="overflow-x-auto">
//     <table className="min-w-full bg-white border rounded-lg shadow">
//       <thead className="bg-gray-200">
//         <tr>
//           <th className="p-3 text-left">Type</th>
//           <th className="p-3 text-left">Recipient</th>
//           <th className="p-3 text-left">Status</th>
//           <th className="p-3 text-left">Date Updated</th>
//           <th className="p-3 text-left">Error</th>
//         </tr>
//       </thead>
//       <tbody>
//         {statuses.map((status, index) => (
//           <tr key={index} className="border-t">
//             <td className="p-3">{status.type}</td>
//             <td className="p-3">{status.recipient}</td>
//             <td className="p-3">
//               <span
//                 className={`px-2 py-1 rounded text-white ${
//                   status.status === "delivered" || status.status === "read"
//                     ? "bg-green-500"
//                     : status.status === "sent"
//                     ? "bg-blue-500"
//                     : status.status === "failed"
//                     ? "bg-red-500"
//                     : "bg-yellow-500"
//                 }`}
//               >
//                 {status.status}
//               </span>
//             </td>
//             <td className="p-3">{new Date(status.dateUpdated).toLocaleString()}</td>
//             <td className="p-3 text-red-500">{status.errorMessage || "-"}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     <div className="mt-4 flex justify-end">
//       <PDFDownloadLink
//         document={<ReportPDF statuses={statuses} />}
//         fileName={`report-${statuses[0]?.dateUpdated.split("T")[0]}.pdf`}
//         className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//       >
//         {({ loading }) => (loading ? "Generating PDF..." : <><FaDownload className="mr-2" /> Download PDF</>)}
//       </PDFDownloadLink>
//     </div>
//   </div>
// );