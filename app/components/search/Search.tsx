import { BiSearch } from 'react-icons/bi';

const Search = () => {
  return (
    <div
      className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        transition
        cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="hidden md:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          Any week
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
          <div className="hidden md:block">Add Guests</div>
          <div className="p-2 bg-black rounded-full text-white md:mr-0 mr-2">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
