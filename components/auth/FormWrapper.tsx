// components/auth/FormWrapper.tsx
const FormWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="rounded-2xl border bg-secondary/30 px-8 py-6 shadow-sm w-full">
      <h2 className="mb-6 text-2xl font-bold font-nunito text-center">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default FormWrapper;
