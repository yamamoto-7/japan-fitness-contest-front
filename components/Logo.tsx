export default function Logo() {
    return (
      <div className="flex items-center gap-2">
        {/* アイコン部分 */}
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white text-xs font-bold">
          JF
        </div>
        {/* テキスト部分 */}
        <div className="leading-tight">
          <p className="text-sm font-semibold text-gray-900">
            Japan Fitness
          </p>
          <p className="text-[10px] text-gray-400">
            contest info
          </p>
        </div>
      </div>
    );
}
  