--
-- PostgreSQL database dump
--

\restrict wvLcmZuu5bOKeoGQuIcaUFyy97feQT2KjjkYH86PAt4bf2EhO1pcp016vMvHE1V

-- Dumped from database version 16.3
-- Dumped by pg_dump version 18.0

-- Started on 2025-11-14 15:37:05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 215 (class 1259 OID 16398)
-- Name: tarefas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tarefas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16429)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    startdate date,
    enddate date,
    completed boolean DEFAULT false
);


--
-- TOC entry 217 (class 1259 OID 16428)
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 217
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- TOC entry 4741 (class 2604 OID 16432)
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- TOC entry 4892 (class 0 OID 16429)
-- Dependencies: 218
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, name, description, startdate, enddate, completed) FROM stdin;
5	Criar task	Criar task	2025-11-13	2025-11-14	f
3	Enviar relatório	Relatório mensal da equipe 2	2025-11-11	2025-11-15	t
\.


--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 215
-- Name: tarefas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tarefas_id_seq', 1, false);


--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 217
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 5, true);


--
-- TOC entry 4746 (class 2606 OID 16437)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


-- Completed on 2025-11-14 15:37:06

--
-- PostgreSQL database dump complete
--

\unrestrict wvLcmZuu5bOKeoGQuIcaUFyy97feQT2KjjkYH86PAt4bf2EhO1pcp016vMvHE1V

