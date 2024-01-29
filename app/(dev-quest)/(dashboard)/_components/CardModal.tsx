import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TextForm } from "./TextForm";

export function CardModal() {
  return (
    <>
      <DialogContent className="sm:max-w-md p-8 ">
        <DialogHeader className="mb-2">
          <DialogTitle className="font-bold text-xl ">
            会社名を登録します
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <TextForm />
        </div>
      </DialogContent>
    </>
  );
}
