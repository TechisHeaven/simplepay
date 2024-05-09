import { IconNotification, IconSettings } from "@tabler/icons-react";

export default function Header() {
  return (
    <div className="flex flex-row justify-between p-8 border-b-[1px] items-center border-gray-600">
      <div className="font-semibold text-xl">Simple Pay</div>
      <h6 className="text-sm font-semibold">Dashboard</h6>
      <div>
        <ul className="flex flex-row gap-4   items-center">
          <li>
            <IconNotification />
          </li>
          <li>
            <IconSettings />
          </li>
        </ul>
      </div>
    </div>
  );
}
