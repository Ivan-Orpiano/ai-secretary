import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './styles/globals.css';
import { ChatProvider } from './context/ChatContext';
import Sidebar from './components/layout/Sidebar';
import Header  from './components/layout/Header';
