import React from "react";
import md5 from "js-md5";

type GravatarProps = {
  email: string;
  size?: number;
  defaultType?: string;
};
const GravatarAvatar = React.forwardRef<
  HTMLImageElement,
  GravatarProps & React.HTMLAttributes<HTMLImageElement>
>(({ email, defaultType = "identicon", ...props }, ref) => {
  const hash = md5.md5(email);
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=${defaultType}`;

  return (
    <div className="hover:bg-input shrink-0 self-center rounded-full p-1">
      <img
        className="hover:bg-input size-8 cursor-pointer rounded-full"
        src={gravatarUrl}
        alt="User Avatar"
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default GravatarAvatar;
