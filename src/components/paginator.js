import React from 'react';
import { Pager } from "../assets/js/paginator";

export default function Paginator({pagerData, rowComponent}) {
    const Row = rowComponent;
    return (
        <>
            <Row data={pagerData} />
        </>
    )
}