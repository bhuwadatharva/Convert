import { toast } from "@/components/ui/use-toast";

export default function bytesToSize(bytes: number): String {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (bytes === 0) return '0 Byte';
    //if (bytes > 2 * 1024 * 1024 * 1024) return 'File size exceed' // 2GB limit
      
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = (bytes / Math.pow(1024, i)).toFixed(2);

  return `${size} ${sizes[i]}`;
}
