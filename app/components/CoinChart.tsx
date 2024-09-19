"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { CSVLink, CSVDownload } from "react-csv";
export function CoinChart() {
  const [csvData, setCSVData] = useState({ data: [], key: 0 });
  const [editData, setEditData] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    Papa.parse(file, {
      complete: function (results) {
        setCSVData(results.data);
        console.log(results);
      },
    });
  };

  const handleChange = (data, key, rowkey) => {
    console.log(data, key, rowkey);
    console.log(csvData[rowkey][key]);
    csvData[rowkey][key] = data;
    setCSVData(csvData);
  };

  return (
    <div className="max-w-[900px] m-auto w-full flex flex-col gap-8">
      <form className="flex gap-2">
        <input
          type="file"
          accept=".csv"
          onChange={handleSubmit}
          placeholder="upload a csv"
          className="border"
        />
      </form>
      <div>
        {csvData && csvData?.length > 0 && (
          <CSVLink data={JSON.stringify(csvData)} headers={csvData[0]}>
            Download me
          </CSVLink>
        )}

        <Table className=" border">
          <TableBody>
            {csvData &&
              csvData?.length &&
              csvData?.map((item, key) => (
                <TableRow>
                  {csvData &&
                    csvData[key]?.length &&
                    csvData[key]?.map((data, key) => (
                      <TableCell className="font-medium">
                        {data || "N/A"}
                      </TableCell>
                    ))}
                  <TableCell className="cursor-pointer">
                    <Dialog>
                      <DialogTrigger
                        onClick={() => setEditData({ data: item, key: key })}
                      >
                        Edit
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Edit your csv</DialogTitle>
                        {editData?.data?.map((item, key) => (
                          <input
                            type="text"
                            defaultValue={item}
                            className="border py-3 w-full px-4"
                            onChange={(e) =>
                              handleChange(e.target.value, key, editData.key)
                            }
                          />
                        ))}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
