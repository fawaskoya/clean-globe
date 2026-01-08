"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
    return (
        <div className="w-full">
            <div className="mx-auto w-full max-w-3xl divide-y divide-gray-200 rounded-2xl bg-white p-2">
                {items.map((item, index) => (
                    <Disclosure as="div" key={index} className="py-4">
                        {({ open }) => (
                            <>
                                <DisclosureButton className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-4 text-left text-sm font-medium text-navy hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-primary/75">
                                    <span className="text-base font-semibold">{item.question}</span>
                                    <ChevronUpIcon
                                        className={`${open ? "rotate-180 transform" : ""
                                            } h-5 w-5 text-primary`}
                                    />
                                </DisclosureButton>
                                <DisclosurePanel className="px-4 pt-4 pb-2 text-base text-gray-600">
                                    {item.answer}
                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>
                ))}
            </div>
        </div>
    );
}
