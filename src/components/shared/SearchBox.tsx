import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Input } from "../ui/input";

const SearchBox = () => {
    return (
        <div className="w-1/7 xxl:w-full max-w-xs relative ">
            <Icon
                icon="lets-icons:search-alt"
                width={20}
                height={20}
                className="w-4 h-4 absolute left-2.5 top-2.5 text-primary"
            />
            <Input
                type="search"
                placeholder="Search"
                className="pl-8 text-primary"
            />
        </div>
    );
};

export default SearchBox;
