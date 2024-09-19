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
  const [csvData, setCSVData] = useState([]);
  const [editData, setEditData] = useState({ data: [], key: 0 });
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
      {csvData.length == 0 ? (
        <div className="relative w-[50vw] h-[50vh] bg-neutral-100 border-dashed text-center">
          <input
            type="file"
            accept=".csv"
            onChange={handleSubmit}
            placeholder="upload a csv"
            className="w-full h-full opacity-0 inset-0 absolute"
          />
          <div className="flex justify-center items-center m-auto inset-0 text-center font-extrabold text-3xl h-full ">
            DROP CSV HERE
          </div>
        </div>
      ) : (
        ""
      )}

      <div>
        {csvData && csvData?.length > 0 ? (
          <CSVLink data={JSON.stringify(csvData)} headers={csvData[0]}>
            <p className="text-white py-3 px-5 bg-black w-[140px]">
              Download me
            </p>
          </CSVLink>
        ) : (
          ""
        )}

        {csvData && csvData?.length ? (
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
                      <Dialog onOpenChange={() => setCSVData(csvData)}>
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
                              onChange={(e) => {
                                handleChange(e.target.value, key, editData.key);
                              }}
                            />
                          ))}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
