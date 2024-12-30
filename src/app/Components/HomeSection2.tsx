import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HomeSection2 = () => {
    return (
        <div>
            <div className="h-full w-full flex flex-col md:flex-row">
                <div className="w-full h-full md:flex translate-all ease-in-out duration-1000 bg-[#FAF4F4] items-center justify-center">
                    <div className="w-full h-full justify-center flex flex-col items-center">
                        <span>
                            <Image src="/HomeSection2IMG1.png" alt="" width={500} height={500} />
                        </span>
                        <span className="text-left w-[70%]">
                            <h2 className="text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-normal text-black">Side table</h2>
                            <Link href="/Shop">
                                <button className="text-black underline py-4 px-2 mt-4 xl:mt-8 text-lg lg:text-xl underline-offset-8 decoration-2">
                                    view more
                                </button>
                            </Link>
                        </span>
                    </div>
                    <div className="w-full h-full justify-center flex flex-col items-center">
                        <span className="">
                            <Image src="/HomeSection2IMG2.png" alt="" width={500} height={500} />
                        </span>
                        <span className="text-left w-[70%]">
                            <h2 className="text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-normal text-black">Side table</h2>
                            <Link href="/Shop">
                                <button className="text-black underline py-4 px-2 mt-4 xl:mt-8 text-lg lg:text-xl underline-offset-8 decoration-2">
                                    view more
                                </button>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSection2;
