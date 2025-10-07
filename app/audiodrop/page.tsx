"use client";

import Image from "next/image";
import { LuFileSymlink } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import ReactDropzone from "react-dropzone";
import bytesToSize from "@/utils/bytes-to-size";
import fileToIcon from "@/utils/file-to-icon";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import compressFileName from "@/utils/compress-file-name";
import { Skeleton } from "@/components/ui/skeleton";
import convertFile from "@/utils/convert";
import { ImSpinner3 } from "react-icons/im";
import { MdDone } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { HiOutlineDownload } from "react-icons/hi";
import { BiError } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import loadFfmpeg from "@/utils/load-ffmpeg";
import type { Action } from "@/types";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import docpick from "@/public/images/docpick.png";
import Head from "next/head";

const extensions = {
  audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
};

export default function Audiodrop() {
  const { toast } = useToast();
  const [isHover, setIsHover] = useState(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  const accepted_files = {
    "audio/*": extensions.audio.map((ext) => `.${ext}`),
  };

  // ---------- Functions ----------
  const reset = () => {
    setIsDone(false);
    setActions([]);
    setFiles([]);
    setIsReady(false);
    setIsConverting(false);
  };

  const download = (action: Action) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = action.url!;
    a.download = action.output!;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(action.url!);
    document.body.removeChild(a);
  };

  const downloadAll = () => {
    actions.forEach((action) => !action.is_error && download(action));
  };

  const convert = async () => {
    setIsConverting(true);
    let tmp_actions = actions.map((a) => ({ ...a, is_converting: true }));
    setActions(tmp_actions);

    for (let action of tmp_actions) {
      try {
        const { url, output } = await convertFile(ffmpegRef.current!, action);
        tmp_actions = tmp_actions.map((a) =>
          a === action
            ? { ...a, is_converted: true, is_converting: false, url, output }
            : a
        );
        setActions(tmp_actions);
      } catch {
        tmp_actions = tmp_actions.map((a) =>
          a === action ? { ...a, is_converting: false, is_error: true } : a
        );
        setActions(tmp_actions);
      }
    }
    setIsDone(true);
    setIsConverting(false);
  };

  const handleUpload = (data: any[]) => {
    setFiles(data);
    const tmp: Action[] = data.map((file) => ({
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

  const updateAction = (file_name: string, to: string) => {
    setActions(
      actions.map((action) =>
        action.file_name === file_name ? { ...action, to } : action
      )
    );
  };

  const checkIsReady = () => {
    setIsReady(actions.every((a) => a.to));
  };

  const deleteAction = (action: Action) => {
    setActions(actions.filter((a) => a !== action));
    setFiles(files.filter((f) => f.name !== action.file_name));
  };

  useEffect(() => {
    if (!actions.length) {
      setIsDone(false);
      setIsReady(false);
      setIsConverting(false);
    } else checkIsReady();
  }, [actions]);

  useEffect(() => {
    const load = async () => {
      const ffmpeg_response = await loadFfmpeg();
      ffmpegRef.current = ffmpeg_response;
      setIsLoaded(true);
    };
    load();
  }, []);

  // ---------- JSX ----------
  return (
    <>
      <Head>
        <title>Audio Converter - Convert the audio</title>
        <meta
          name="description"
          content="Convert the audio in a different audio format with the help of Doshift-file Converter"
        />
      </Head>

      {actions.length ? (
        <div className="space-y-6 p-4 lg:p-0">
          {actions.map((action, i) => (
            <div
              key={i}
              className="w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between border-[#EFC6F0]"
            >
              {!isLoaded && (
                <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl" />
              )}

              <div className="flex gap-4 items-center">
                <span className="text-2xl text-orange-600">
                  {fileToIcon(action.file_type)}
                </span>
                <div className="flex items-center gap-1 w-full lg:w-96">
                  <span className="text-md font-medium overflow-x-hidden">
                    {compressFileName(action.file_name)}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    ({bytesToSize(action.file_size)})
                  </span>
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
                <div className="text-muted-foreground text-md flex items-center gap-4">
                  <span>Convert to</span>
                  <Select
                    onValueChange={(value) =>
                      updateAction(action.file_name, value)
                    }
                    value={action.to ?? ""}
                  >
                    <SelectTrigger className="w-32 outline-none focus:outline-none focus:ring-0 text-center text-muted-foreground bg-background text-md font-medium">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="h-fit">
                      <div className="grid grid-cols-2 gap-2 w-fit bg-white">
                        {extensions.audio.map((elt, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={elt} className="mx-auto">
                              {elt}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {action.is_converted ? (
                <Button onClick={() => download(action)}>Download</Button>
              ) : (
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
      ) : (
        <div className="p-4 lg:ml-80">
          <ReactDropzone
            onDrop={handleUpload}
            onDragEnter={() => setIsHover(true)}
            onDragLeave={() => setIsHover(false)}
            accept={accepted_files}
            onDropRejected={() =>
              toast({
                variant: "destructive",
                title: "Error uploading your file(s)",
                description: "Allowed Files: Audio only.",
                duration: 5000,
              })
            }
            onError={() =>
              toast({
                variant: "destructive",
                title: "Error uploading your file(s)",
                description: "Allowed Files: Audio only.",
                duration: 5000,
              })
            }
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="bg-[#E593E614] h-72 lg:h-80 xl:h-96 rounded-3xl shadow-sm border-[#800080] border-4 border-dashed cursor-pointer flex items-center justify-center"
              >
                <input {...getInputProps()} />
                <div className="space-y-4 text-[#800080]">
                  {isHover ? (
                    <>
                      <div className="justify-center flex text-6xl">
                        <LuFileSymlink />
                      </div>
                      <h3 className="text-center font-medium text-2xl">
                        Yes, right there
                      </h3>
                    </>
                  ) : (
                    <>
                      <div className="justify-center flex text-6xl">
                        <Image
                          src={docpick}
                          alt="document icon"
                          width={80}
                          height={80}
                        />
                      </div>
                      <h3 className="text-center font-medium text-2xl">
                        Drag and drop or{" "}
                        <span className="text-[#E593E6] underline">
                          upload Audio
                        </span>
                      </h3>
                    </>
                  )}
                </div>
              </div>
            )}
          </ReactDropzone>

          <div className="lg:hidden mt-4 flex space-x-4">
            <Button
              onClick={() => (window.location.href = "/")}
              className="bg-[#F0EEF7] border-[#800080] border-2"
            >
              Image Converter
            </Button>
            <Button
              onClick={() => (window.location.href = "/videodrop")}
              className="bg-[#F0EEF7] border-[#800080] border-2"
              title="Video Converter"
            >
              Video Converter
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
