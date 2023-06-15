import { MegaphoneIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function FilePreview({ file }) {
  return file ? (
    <img
      className="fbb-h-18 fbb-w-18 fbb-m-auto fbb-rounded-md"
      src={file}
      alt=""
    />
  ) : (
    <PhotoIcon
      className="fbb-mx-auto fbb-h-12 fbb-w-12 fbb-text-gray-400"
      aria-hidden="true"
    />
  );
}
