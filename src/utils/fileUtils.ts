import fs from "fs";

export function formatBytes(bytes: number, decimals: number = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function readFiles(
  dirname: string,
  onFileContent: (filename: string, data: string) => void,
  onError: (error: NodeJS.ErrnoException | null) => void
) {
  fs.readdir(dirname, (err, filenames) => {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach((filename) => {
      fs.readFile(dirname + filename, "utf-8", (error, data) => {
        if (error) {
          onError(error);
          return;
        }
        onFileContent(filename, data);
      });
    });
  });
}
