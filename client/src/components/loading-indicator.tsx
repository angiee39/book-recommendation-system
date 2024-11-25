export default function CustomLoadingScreen() {
    return (
        <div
            className="absolute top-0 left-0 right-0 bottom-0 h-screen w-screen flex items-center justify-center bg-white bg-opacity-80 z-50">
            <div className="text-xl font-semibold text-gray-700">Loading...</div>
        </div>
    );
}