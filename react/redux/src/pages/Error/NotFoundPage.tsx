import customHistory from '../../components/router/CustomHistory'

export default function NotFoundPage() {
    // ! Functions
    function onBack() {
        customHistory.back()
    }

    return (
        <div className=" flex h-screen w-screen flex-col items-center justify-center">
            <h1 className="mb-3 text-4xl font-medium">page not found</h1>
            <span className="cursor-default text-base">
                click&nbsp;
                <a
                    className="cursor-pointer text-base  hover:underline font-semibold"
                    onClick={onBack}
                >
                    here
                </a>
                &nbsp;to go back where you were
            </span>
        </div>
    )
}
