"use client";

import { FiUploadCloud } from "react-icons/fi";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import Head from 'next/head'; // Import Head
import { Metadata } from "next";

const extensions = {
  video: ["mp4", "mkv", "mov", "avi", "flv", "wmv"],
  audio: ["mp3", "wav", "ogg", "aac", "flac", "m4a"],
};

const metadata: Metadata = {
  title: "Video Converter",
  description: "Convert the video in audio and other format"
}

export default function VideoDrop() {
  const { toast } = useToast();
  const [is_hover, setIsHover] = useState<boolean>(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [is_ready, setIsReady] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<any>>([]);
  const [is_loaded, setIsLoaded] = useState<boolean>(false);
  const [is_converting, setIsConverting] = useState<boolean>(false);
  const [is_done, setIsDone] = useState<boolean>(false);
  const ffmpegRef = useRef<any>(null);
  const [defaultValues, setDefaultValues] = useState<string>("video");
  const [selected, setSelected] = useState<string>("...");
  const accepted_files = {
    "video/*": [".mp4", ".mkv", ".mov", ".avi", ".flv", ".wmv"],
  };

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Convert the video to other formats or different audio formats with the help of Docshift - file converter';
    document.head.appendChild(meta);

    const title = document.createElement('title');
    title.textContent = 'Video Converter - Convert the video';
    document.head.appendChild(title);

    const creator = document.createElement('meta');
    creator.name = 'creator';
    creator.content = 'GDSC WEB DEV TEAM';
    document.head.appendChild(creator);

    const keywords = document.createElement('meta');
    keywords.name = 'keywords';
    keywords.content = 'image converter, video converter, audio converter, unlimited image converter, unlimited video converter';
    document.head.appendChild(keywords);
  }, []);

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

    // Clean up after download
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
      const formData = new FormData();
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
          return {
            ...action,
            to,
          };
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

  return (
    <div>
      {/* Setting the metadata */}
      <Head>
        <title>Video Converter - Convert the video</title>
        <meta name="description" content="Convert the video to other formats or different audio formats with the help of Docshift - file converter" />
        <meta name="creator" content="GDSC WEB DEV TEAM" />
        <meta name="keywords" content="image converter, video converter, audio converter, unlimited image converter, unlimited video converter" />
      </Head>
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
              description: "Allowed Files: Video files only.",
              duration: 5000,
            });
          }}
          onError={() => {
            handleExitHover();
            toast({
              variant: "destructive",
              title: "Error uploading your file(s)",
              description: "Allowed Files: Video files only.",
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
                      Drag and drop or
                      <span className="text-[#E593E6] underline">upload Video</span>
                    </h3>
                  </>
                )}
              </div>
            </div>
          )}
        </ReactDropzone>
        <div className="lg:hidden mt-4 flex space-x-4">
          <Button onClick={() => window.location.href = '/'} className="bg-[#F0EEF7] border-[#800080] border-2" >Image Converter</Button>
          <Button onClick={() => window.location.href = '/audiodrop'} className="bg-[#F0EEF7] border-[#800080] border-2" >Audio Converter</Button>
        </div>
      </div>
    </div>
  );
}
