import { WanderingEyes } from "@/app/components/wandering-eyes";

export default function Loading() {
    return (
        <div className="flex fixed inset-0 flex-col justify-center items-center cursor-not-allowed">
            <WanderingEyes className="h-32 w-32" />
        </div>
    );
}