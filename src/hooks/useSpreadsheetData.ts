import { useState, useEffect } from 'react';
import { Book } from '../types';

const SHEET_ID = '18eN8bWGdXsE6Aeb7wINYCrYukCoxFLoK';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

export function useSpreadsheetData() {
  const [data, setData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(SHEET_URL);
        const text = await response.text();
        // Remove the Google Sheets prefix and suffix
        const jsonString = text.substring(47).slice(0, -2);
        const jsonData = JSON.parse(jsonString);
        
        // Map the data to our Book interface
        const books = jsonData.table.rows
          .filter((row: any) => row.c[0]?.v) // Filter out empty rows
          .map((row: any) => ({
            title: row.c[0]?.v || '',
            url: row.c[1]?.v || '',
            text: row.c[2]?.v || '',
            category: row.c[3]?.v || '',
            goodReads: row.c[4]?.v?.toString() || '',
            reviews: row.c[5]?.v?.toString() || '',
            imgUrl: row.c[6]?.v || '',
            price: row.c[7]?.v?.toString() || '',
            rank: row.c[8]?.v || null
          }));

        // Set default images for specific books
        const booksWithImages = books.map(book => {
          if (book.title === "The Anxious Generation") {
            return { ...book, imgUrl: "https://i.imgur.com/l4noBg6.jpeg" };
          }
          if (book.title === "Winning the War in Your Mind") {
            return { ...book, imgUrl: "https://i.imgur.com/JtSxjfV.jpeg" };
          }
          if (book.title === "Building a Non-Anxious Life") {
            return { ...book, imgUrl: "https://i.imgur.com/aODq2ns.jpeg" };
          }
          return book;
        });

        setData(booksWithImages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching spreadsheet data:", err);
        setError('Failed to load data from spreadsheet');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}