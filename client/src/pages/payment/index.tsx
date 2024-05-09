export default function Page() {
  return (
    <div className="p-8 w-full flex-row flex gap-4">
      <div className="w-full max-w-[420px] p-4">
        <h1 className="font-semibold text-3xl py-4">Send Money</h1>
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="receiver">To</label>
          <input
            type="text"
            placeholder="Name, Email, Phone no."
            className="w-full p-2 px-4 outline-none rounded-md bg-secondary-color-background  focus:border-primary-color hover:border-primary-color border transition-all"
          />
        </div>
      </div>
      <div className="receive w-full p-4 max-w-[420px]">
        <h1 className="text-3xl font-semibold py-4">Receive</h1>
      </div>
    </div>
  );
}
