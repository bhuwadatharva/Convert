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
import { Metadata } from "next";
import Head from "next/head";

const extensions = {
  audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
};

export const Metadata = {
  title: "Audio Converter- Convert the audio",
  description: `Convert the audio in a different audio format with the help of Doshift-file COnverter`,
  creator: "GDSC WEB DEV TEAM",
  keywords:
    "image converter, video converter, audio converter, unlimited image converter, unlimited video converter",
};

export default function Audiodrop() {
  const { toast } = useToast();
  const [is_hover, setIsHover] = useState<boolean>(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [is_ready, setIsReady] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<any>>([]);
  const [is_loaded, setIsLoaded] = useState<boolean>(false);
  const [is_converting, setIsConverting] = useState<boolean>(false);
  const [is_done, setIsDone] = useState<boolean>(false);
  const ffmpegRef = useRef<any>(null);
  const accepted_files = {
    "audio/*": extensions.audio.map((ext) => `.${ext}`),
  };

  // functions
  const reset = () => {
    setIsDone(false);
    setActions([]);
    setFiles([]);
    setIsReady(false);
    setIsConverting(false);
  };

  const downloadAll = (): void => {
    for (let action of actions) {
      !action.is_error && download(action);
    }
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

  const convert = async (): Promise<any> => {
    let tmp_actions = actions.map((elt) => ({
      ...elt,
      is_converting: true,
    }));
    setActions(tmp_actions);
    setIsConverting(true);

    for (let action of tmp_actions) {
      try {
        const { url, output } = await convertFile(ffmpegRef.current, action);
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: true,
                is_converting: false,
                url,
                output,
              }
            : elt
        );
        setActions(tmp_actions);
      } catch (err) {
        tmp_actions = tmp_actions.map((elt) =>
          elt === action
            ? {
                ...elt,
                is_converted: false,
                is_converting: false,
                is_error: true,
              }
            : elt
        );
        setActions(tmp_actions);
      }
    }
    setIsDone(true);
    setIsConverting(false);
  };

  const handleUpload = (data: Array<any>): void => {
    handleExitHover();
    setFiles(data);
    const tmp: Action[] = [];
    data.forEach((file: any) => {
      tmp.push({
        file_name: file.name,
        file_size: file.size,
        from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
        to: null,
        file_type: file.type,
        file,
        is_converted: false,
        is_converting: false,
        is_error: false,
      });
    });
    setActions(tmp);
  };

  const handleHover = (): void => setIsHover(true);
  const handleExitHover = (): void => setIsHover(false);

  const updateAction = (file_name: string, to: string) => {
    setActions(
      actions.map((action): Action => {
        if (action.file_name === file_name) {
          return { ...action, to };
        }
        return action;
      })
    );
  };

  const checkIsReady = (): void => {
    let tmp_is_ready = true;
    actions.forEach((action: Action) => {
      if (!action.to) tmp_is_ready = false;
    });
    setIsReady(tmp_is_ready);
  };

  const deleteAction = (action: Action): void => {
    setActions(actions.filter((elt) => elt !== action));
    setFiles(files.filter((elt) => elt.name !== action.file_name));
  };

  // safely handle missing dependency warning
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!actions.length) {
      setIsDone(false);
      setFiles([]);
      setIsReady(false);
      setIsConverting(false);
    } else checkIsReady();
  }, [actions]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const ffmpeg_response: FFmpeg = await loadFfmpeg();
    ffmpegRef.current = ffmpeg_response;
    setIsLoaded(true);
  };

  // JSX return
  if (actions.length) {
    return (
      <div className="space-y-6 p-4 lg:p-0">
        {actions.map((action: Action, i: any) => (
          <div
            key={i}
            className="w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between border-[#EFC6F0]"
          >
            {!is_loaded && (
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
                  value={action.to || ""}
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
          {is_done ? (
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
              disabled={!is_ready || is_converting}
              className="rounded-xl font-semibold relative py-4 text-md flex items-center w-44 bg-[#E593E6]"
              onClick={convert}
            >
              {is_converting ? (
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
        accept={accepted_files}
        onDropRejected={() => {
          handleExitHover();
          toast({
            variant: "destructive",
            title: "Error uploading your file(s)",
            description: "Allowed Files: Audio only.",
            duration: 5000,
          });
        }}
        onError={() => {
          handleExitHover();
          toast({
            variant: "destructive",
            title: "Error uploading your file(s)",
            description: "Allowed Files: Audio only.",
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
              {is_hover ? (
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
                    <img src={docpick.src} alt="document icon" />
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
  );
}
