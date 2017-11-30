import Index from '../components/search'
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const reout

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/tacos',
        component: Tacos,
        routes: [
            {
                path: '/tacos/bus',
                component: Bus
            }
        ]
    }
]



export default routeConfig;