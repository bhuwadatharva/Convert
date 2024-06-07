import about from "@/public/images/about.png";
import film from "@/public/images/film.png";
import photo from "@/public/images/photo.png";
import mic from "@/public/images/mic.png";

export default function About() {
    return (
        <>
            <div className="flex items-center justify-center">
                <div>
                    <h1 className="font-bold text-5xl ml-44">ABOUT US</h1>
                    <p className="ml-44 mt-10 text-xl">
                        &quot;Unlock the power of seamless document conversion with our PDF converter website. Say goodbye to file format headaches as you effortlessly convert PDFs into editable documents. Whether it&apos;s Word, Excel, or PowerPoint, our user-friendly platform ensures precision and efficiency. Experience the convenience of instant conversion without compromising on quality. Join thousands of satisfied users who trust us for their document transformation needs. Embrace simplicity and reliability with our PDF converter today!&quot;
                    </p>
                </div>
                <img src={about.src} className="ml-80 -mr-28 h-64" />
            </div>
            <div>
                <h1 className="align-middle justify-center flex font-bold ml-64 text-4xl mt-20">Services</h1>
                <p className="text-center font-bold ml-60">Find the services you need</p>

                <div className="flex ml-52 mt-10 gap-12 p-4 items-center justify-center">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-3">
                        <a href="#">
                            <img className="rounded-t-lg ml-16" src={photo.src} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Image Conversion</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-base text-center">
                                &quot;Image conversion refers to the process of transforming an image from one file format, resolution, or color space to another.&quot;
                            </p>
                        </div>
                    </div>

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg ml-16" src={mic.src} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Audio Transformation</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ml-7 text-base text-center">
                                &quot;Audio transformation involves altering or manipulating sound signals to achieve desired effects or enhancements.&quot;
                            </p>
                        </div>
                    </div>

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg ml-24" src={film.src} alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ml-5 text-center">Video Metamorphosis</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ml-7 text-base text-center">
                                &quot;Video metamorphosis seamlessly transforms visual narratives, bridging imagination and reality through the art of digital evolution.&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
