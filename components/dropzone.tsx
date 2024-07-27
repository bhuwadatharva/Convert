"use client";

import { LuFileSymlink } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import ReactDropzone from "react-dropzone";
import bytesToSize from "@/utils/bytes-to-size";
import fileToIcon from "@/utils/file-to-icon";
import { useState, useEffect, useRef } from "react";
import { useToast } from "./ui/use-toast";
import compressFileName from "@/utils/compress-file-name";
import { Skeleton } from "./ui/skeleton";
import convertFile from "@/utils/convert";
import { ImSpinner3 } from "react-icons/im";
import { MdDone } from "react-icons/md";
import { Badge } from "./ui/badge";
import { HiOutlineDownload } from "react-icons/hi";
import { BiError } from "react-icons/bi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import loadFfmpeg from "@/utils/load-ffmpeg";
import type { Action } from "@/types";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import docpick from "../public/images/docpick.png";

const extensions = {
  image: ["jpg", "jpeg", "png", "gif", "bmp", "webp", "ico", "tif", "tiff", "svg", "raw", "tga"],
};

export const Metadata = {
  title: "Image Converter- Convert the image in different format",
  description: `Convert the image in a different image format with the help of Doshift-file Converter`,
  creator: "GDSC WEB DEV TEAM",
  keywords: "image converter, video converter, audio converter, unlimited image converter, unlimited video converter",
};


export default function Dropzone() {
  const { toast } = useToast();
  const [isHover, setIsHover] = useState(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const ffmpegRef = useRef<any>(null);
  const acceptedFiles = { "image/*": extensions.image.map(ext => `.${ext}`) };

  const reset = () => {
    setIsDone(false);
    setActions([]);
    setFiles([]);
    setIsReady(false);
    setIsConverting(false);
  };

  const downloadAll = () => {
    actions.forEach(action => {
      if (!action.is_error) download(action);
    });
  };

  const download = (action: Action) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = action.url;
    a.download = action.output;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(action.url);
    document.body.removeChild(a);
  };

  const convert = async () => {
    let tmpActions = actions.map(action => ({
      ...action,
      is_converting: true,
    }));
    setActions(tmpActions);
    setIsConverting(true);

    for (let action of tmpActions) {
      try {
        const { url, output } = await convertFile(ffmpegRef.current, action);
        tmpActions = tmpActions.map(elt =>
          elt === action
            ? { ...elt, is_converted: true, is_converting: false, url, output }
            : elt
        );
        setActions(tmpActions);
      } catch (err) {
        tmpActions = tmpActions.map(elt =>
          elt === action ? { ...elt, is_converted: false, is_converting: false, is_error: true } : elt
        );
        setActions(tmpActions);
      }
    }
    setIsDone(true);
    setIsConverting(false);
  };

  const handleUpload = (data: any[]) => {
    handleExitHover();
    setFiles(data);
    const tmp: Action[] = data.map(file => ({
      file_name: file.name,
      file_size: file.size,
      from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
      to: null,
      file_type: file.type,
      file,
      is_converted: false,
      is_converting: false,
      is_error: false,
    }));
    setActions(tmp);
  };

  const handleHover = () => setIsHover(true);
  const handleExitHover = () => setIsHover(false);

  const updateAction = (file_name: string, to: string) => {
    setActions(actions.map(action => (action.file_name === file_name ? { ...action, to } : action)));
  };

  const checkIsReady = () => {
    setIsReady(actions.every(action => action.to));
  };

  const deleteAction = (action: Action) => {
    setActions(actions.filter(elt => elt !== action));
    setFiles(files.filter(elt => elt.name !== action.file_name));
  };

  useEffect(() => {
    if (actions.length === 0) {
      setIsDone(false);
      setFiles([]);
      setIsReady(false);
      setIsConverting(false);
    } else {
      checkIsReady();
    }
  }, [actions]);

  useEffect(() => {
    loadFfmpeg().then(ffmpeg => {
      ffmpegRef.current = ffmpeg;
      setIsLoaded(true);
    });
  }, []);

  if (actions.length) {
    return (
      <div className="space-y-6 p-4 lg:p-0">
        {actions.map((action, i) => (
          <div
            key={i}
            className="w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between border-[#EFC6F0]"
          >
            {!isLoaded && <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl" />}
            <div className="flex gap-4 items-center">
              <span className="text-2xl text-orange-600">{fileToIcon(action.file_type)}</span>
              <div className="flex items-center gap-1 w-64 lg:w-96">
                <span className="text-md font-medium overflow-x-hidden">{compressFileName(action.file_name)}</span>
                <span className="text-muted-foreground text-sm">({bytesToSize(action.file_size)})</span>
              </div>
            </div>

            {action.is_error ? (
              <Badge className="flex gap-2">
                <span>Error Converting File</span>
                <BiError />
              </Badge>
            ) : action.is_converted ? (
              <Badge className="flex gap-2 border-[#E593E6]">
                <span>Done</span>
                <MdDone />
              </Badge>
            ) : action.is_converting ? (
              <Badge className="flex gap-2">
                <span>Converting</span>
                <span className="animate-spin">
                  <ImSpinner3 />
                </span>
              </Badge>
            ) : (
              <div className="text-muted-foreground text-md flex items-center gap-4 w-full lg:w-auto">
                <span>Convert to</span>
                <Select
                  onValueChange={value => updateAction(action.file_name, value)}
                  value={action.to || ""}
                >
                  <SelectTrigger className="w-32 outline-none focus:outline-none focus:ring-0 text-center text-muted-foreground bg-background text-md font-medium">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="h-fit">
                    {action.file_type.includes("image") && (
                      <div className="grid grid-cols-2 gap-2 w-fit bg-white">
                        {extensions.image.map((elt, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={elt} className="mx-auto">
                              {elt}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {!action.is_converted && !action.is_converting && (
              <span
                onClick={() => deleteAction(action)}
                className="cursor-pointer hover:bg-muted rounded-full h-10 w-10 flex items-center justify-center text-2xl text-foreground"
              >
                <MdClose />
              </span>
            )}
          </div>
        ))}
        <div className="flex w-full justify-end">
          {isDone ? (
            <div className="space-y-4 w-fit">
              <Button
                className="rounded-xl font-semibold relative py-4 text-md flex gap-2 items-center w-full bg-[#E593E6]"
                onClick={downloadAll}
              >
                {actions.length > 1 ? "Download All" : "Download"}
                <HiOutlineDownload />
              </Button>
              <Button onClick={reset} className="rounded-xl">
                Convert Another File(s)
              </Button>
            </div>
          ) : (
            <Button
              disabled={!isReady || isConverting}
              className="rounded-xl font-semibold relative py-4 text-md flex items-center w-44 bg-[#E593E6]"
              onClick={convert}
            >
              {isConverting ? (
                <span className="animate-spin text-lg">
                  <ImSpinner3 />
                </span>
              ) : (
                <span>Convert Now</span>
              )}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:ml-80">
      <ReactDropzone
        onDrop={handleUpload}
        onDragEnter={handleHover}
        onDragLeave={handleExitHover}
        accept={acceptedFiles}
        onDropRejected={() => {
          handleExitHover();
          toast({
            variant: "destructive",
            title: "Error uploading your file(s)",
            description: "Allowed Files: Images only.",
            duration: 5000,
          });
        }}
        onError={() => {
          handleExitHover();
          toast({
            variant: "destructive",
            title: "Error uploading your file(s)",
            description: "Allowed Files: Images only.",
            duration: 5000,
          });
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={`bg-[#E593E614] h-72 lg:h-80 xl:h-96 rounded-3xl shadow-sm border-[#800080] border-4 border-dashed cursor-pointer flex items-center justify-center`}
          >
            <input {...getInputProps()} />
            <div className="space-y-4 text-[#800080]">
              {isHover ? (
                <>
                  <div className="justify-center flex text-6xl">
                    <LuFileSymlink />
                  </div>
                  <h3 className="text-center font-medium text-2xl">Yes, right there</h3>
                </>
              ) : (
                <>
                  <div className="justify-center flex text-6xl">
                    <img src={docpick.src} alt="document icon" />
                  </div>
                  <h3 className="text-center font-bold text-2xl">
                    Drag and drop or <span className="text-[#E593E6] underline">upload Image</span>
                  </h3>
                </>
              )}
            </div>
          </div>
        )}
      </ReactDropzone>
      <div className="lg:hidden mt-4 flex space-x-4">
        <Button onClick={() => (window.location.href = "/audiodrop")} className="bg-[#F0EEF7] border-[#800080] border-2">
          Audio Converter
        </Button>
        <Button onClick={() => (window.location.href = "/videodrop")} className="bg-[#F0EEF7] border-[#800080] border-2">
          Video Converter
        </Button>
      </div>
    </div>
  );
}
