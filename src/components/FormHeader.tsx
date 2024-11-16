export type ArgTypes = {
  number: string;
  text: string;
  className?: string;
};

export const FormHeader = ({ number, text, className = "" }: ArgTypes) => {
  return (
    <div
      className={`relative border-2 border-black pl-px text-center ${className}`}
    >
      <span className="absolute inline-block flex h-6 w-6 items-center justify-center rounded-full border border-neutral-600">
        {number}
      </span>
      <h3 className="mx-2">{text}</h3>
    </div>
  );
};
