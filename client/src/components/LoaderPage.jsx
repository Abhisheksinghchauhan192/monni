import {Loader} from "lucide-react";
export default function LoaderPage({msg}) {
  return (
    <div className="min-h-screen flex items-center justify-center gap-4">
        <Loader className="text-lg sm:text-4xl font-medium animate-spin"/>
      <p className="sm:text-4xl text-md">{msg}</p>
    </div>
  )
}
