/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/dashboard";
exports.ids = ["pages/dashboard"];
exports.modules = {

/***/ "(pages-dir-node)/./components/Dashboard.js":
/*!*********************************!*\
  !*** ./components/Dashboard.js ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-chartjs-2 */ \"react-chartjs-2\");\n/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! chart.js */ \"chart.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__, react_chartjs_2__WEBPACK_IMPORTED_MODULE_3__, chart_js__WEBPACK_IMPORTED_MODULE_4__]);\n([axios__WEBPACK_IMPORTED_MODULE_2__, react_chartjs_2__WEBPACK_IMPORTED_MODULE_3__, chart_js__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n// components/Dashboard.js\n\n\n\n\n\nchart_js__WEBPACK_IMPORTED_MODULE_4__.Chart.register(chart_js__WEBPACK_IMPORTED_MODULE_4__.CategoryScale, chart_js__WEBPACK_IMPORTED_MODULE_4__.LinearScale, chart_js__WEBPACK_IMPORTED_MODULE_4__.BarElement, chart_js__WEBPACK_IMPORTED_MODULE_4__.Title, chart_js__WEBPACK_IMPORTED_MODULE_4__.Tooltip, chart_js__WEBPACK_IMPORTED_MODULE_4__.Legend);\nconst Dashboard = ()=>{\n    const [assessments, setAssessments] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [filter, setFilter] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    // Busca as avaliações ao carregar o componente\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"Dashboard.useEffect\": ()=>{\n            const fetchAssessments = {\n                \"Dashboard.useEffect.fetchAssessments\": async ()=>{\n                    try {\n                        const response = await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/api/control-assessments/\");\n                        setAssessments(response.data);\n                    } catch (error) {\n                        console.error(\"Erro ao buscar avaliações:\", error);\n                    }\n                }\n            }[\"Dashboard.useEffect.fetchAssessments\"];\n            fetchAssessments();\n        }\n    }[\"Dashboard.useEffect\"], []);\n    // Filtra as avaliações com base no texto digitado\n    const filteredAssessments = assessments.filter((a)=>a.question.text.toLowerCase().includes(filter.toLowerCase()));\n    // Dados para o gráfico\n    const data = {\n        labels: filteredAssessments.map((a)=>a.question.text),\n        datasets: [\n            {\n                label: \"Pontuação\",\n                data: filteredAssessments.map((a)=>a.score),\n                backgroundColor: \"rgba(35, 173, 150, 0.2)\",\n                borderColor: \"rgb(35, 143, 231)\",\n                borderWidth: 1\n            }\n        ]\n    };\n    // Função para baixar relatório\n    const handleDownloadReport = async (assessmentId)=>{\n        try {\n            const response = await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(`/api/control-assessments/${assessmentId}/generate-report/`, {\n                responseType: \"blob\"\n            });\n            const url = window.URL.createObjectURL(new Blob([\n                response.data\n            ]));\n            const link = document.createElement(\"a\");\n            link.href = url;\n            link.setAttribute(\"download\", `report_${assessmentId}.pdf`);\n            document.body.appendChild(link);\n            link.click();\n        } catch (error) {\n            console.error(\"Erro ao baixar relatório:\", error);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Dashboard de Avalia\\xe7\\xf5es\"\n            }, void 0, false, {\n                fileName: \"/app/components/Dashboard.js\",\n                lineNumber: 75,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                type: \"text\",\n                placeholder: \"Filtrar por pergunta\",\n                value: filter,\n                onChange: (e)=>setFilter(e.target.value)\n            }, void 0, false, {\n                fileName: \"/app/components/Dashboard.js\",\n                lineNumber: 76,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_chartjs_2__WEBPACK_IMPORTED_MODULE_3__.Bar, {\n                data: data\n            }, void 0, false, {\n                fileName: \"/app/components/Dashboard.js\",\n                lineNumber: 82,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: filteredAssessments.map((assessment)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                children: assessment.question.text\n                            }, void 0, false, {\n                                fileName: \"/app/components/Dashboard.js\",\n                                lineNumber: 86,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: [\n                                    \"Pontua\\xe7\\xe3o: \",\n                                    assessment.score\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/app/components/Dashboard.js\",\n                                lineNumber: 87,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: ()=>handleDownloadReport(assessment.id),\n                                children: \"Baixar Relat\\xf3rio\"\n                            }, void 0, false, {\n                                fileName: \"/app/components/Dashboard.js\",\n                                lineNumber: 88,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, assessment.id, true, {\n                        fileName: \"/app/components/Dashboard.js\",\n                        lineNumber: 85,\n                        columnNumber: 11\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/app/components/Dashboard.js\",\n                lineNumber: 83,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/app/components/Dashboard.js\",\n        lineNumber: 74,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dashboard);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvRGFzaGJvYXJkLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEJBQTBCOztBQUN5QjtBQUN6QjtBQUNZO0FBU3BCO0FBRWxCTSwyQ0FBT0EsQ0FBQ08sUUFBUSxDQUFDTixtREFBYUEsRUFBRUMsaURBQVdBLEVBQUVDLGdEQUFVQSxFQUFFQywyQ0FBS0EsRUFBRUMsNkNBQU9BLEVBQUVDLDRDQUFNQTtBQUUvRSxNQUFNRSxZQUFZO0lBQ2hCLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHZCwrQ0FBUUEsQ0FBQyxFQUFFO0lBQ2pELE1BQU0sQ0FBQ2UsUUFBUUMsVUFBVSxHQUFHaEIsK0NBQVFBLENBQUM7SUFFckMsK0NBQStDO0lBQy9DRCxnREFBU0E7K0JBQUM7WUFDUixNQUFNa0I7d0RBQW1CO29CQUN2QixJQUFJO3dCQUNGLE1BQU1DLFdBQVcsTUFBTWpCLGlEQUFTLENBQUM7d0JBQ2pDYSxlQUFlSSxTQUFTRSxJQUFJO29CQUM5QixFQUFFLE9BQU9DLE9BQU87d0JBQ2RDLFFBQVFELEtBQUssQ0FBQyw4QkFBOEJBO29CQUM5QztnQkFDRjs7WUFDQUo7UUFDRjs4QkFBRyxFQUFFO0lBRUwsa0RBQWtEO0lBQ2xELE1BQU1NLHNCQUFzQlYsWUFBWUUsTUFBTSxDQUFDLENBQUNTLElBQzlDQSxFQUFFQyxRQUFRLENBQUNDLElBQUksQ0FBQ0MsV0FBVyxHQUFHQyxRQUFRLENBQUNiLE9BQU9ZLFdBQVc7SUFHM0QsdUJBQXVCO0lBQ3ZCLE1BQU1QLE9BQU87UUFDWFMsUUFBUU4sb0JBQW9CTyxHQUFHLENBQUMsQ0FBQ04sSUFBTUEsRUFBRUMsUUFBUSxDQUFDQyxJQUFJO1FBQ3RESyxVQUFVO1lBQ1I7Z0JBQ0VDLE9BQU87Z0JBQ1BaLE1BQU1HLG9CQUFvQk8sR0FBRyxDQUFDLENBQUNOLElBQU1BLEVBQUVTLEtBQUs7Z0JBQzVDQyxpQkFBaUI7Z0JBQ2pCQyxhQUFhO2dCQUNiQyxhQUFhO1lBQ2Y7U0FDRDtJQUNIO0lBRUEsK0JBQStCO0lBQy9CLE1BQU1DLHVCQUF1QixPQUFPQztRQUNsQyxJQUFJO1lBQ0YsTUFBTXBCLFdBQVcsTUFBTWpCLGlEQUFTLENBQzlCLENBQUMseUJBQXlCLEVBQUVxQyxhQUFhLGlCQUFpQixDQUFDLEVBQzNEO2dCQUNFQyxjQUFjO1lBQ2hCO1lBRUYsTUFBTUMsTUFBTUMsT0FBT0MsR0FBRyxDQUFDQyxlQUFlLENBQUMsSUFBSUMsS0FBSztnQkFBQzFCLFNBQVNFLElBQUk7YUFBQztZQUMvRCxNQUFNeUIsT0FBT0MsU0FBU0MsYUFBYSxDQUFDO1lBQ3BDRixLQUFLRyxJQUFJLEdBQUdSO1lBQ1pLLEtBQUtJLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFWCxhQUFhLElBQUksQ0FBQztZQUMxRFEsU0FBU0ksSUFBSSxDQUFDQyxXQUFXLENBQUNOO1lBQzFCQSxLQUFLTyxLQUFLO1FBQ1osRUFBRSxPQUFPL0IsT0FBTztZQUNkQyxRQUFRRCxLQUFLLENBQUMsNkJBQTZCQTtRQUM3QztJQUNGO0lBRUEscUJBQ0UsOERBQUNnQzs7MEJBQ0MsOERBQUNDOzBCQUFHOzs7Ozs7MEJBQ0osOERBQUNDO2dCQUNDQyxNQUFLO2dCQUNMQyxhQUFZO2dCQUNaQyxPQUFPM0M7Z0JBQ1A0QyxVQUFVLENBQUNDLElBQU01QyxVQUFVNEMsRUFBRUMsTUFBTSxDQUFDSCxLQUFLOzs7Ozs7MEJBRTNDLDhEQUFDeEQsZ0RBQUdBO2dCQUFDa0IsTUFBTUE7Ozs7OzswQkFDWCw4REFBQ2lDOzBCQUNFOUIsb0JBQW9CTyxHQUFHLENBQUMsQ0FBQ2dDLDJCQUN4Qiw4REFBQ1Q7OzBDQUNDLDhEQUFDVTswQ0FBSUQsV0FBV3JDLFFBQVEsQ0FBQ0MsSUFBSTs7Ozs7OzBDQUM3Qiw4REFBQ3NDOztvQ0FBRTtvQ0FBWUYsV0FBVzdCLEtBQUs7Ozs7Ozs7MENBQy9CLDhEQUFDZ0M7Z0NBQU9DLFNBQVMsSUFBTTdCLHFCQUFxQnlCLFdBQVdLLEVBQUU7MENBQUc7Ozs7Ozs7dUJBSHBETCxXQUFXSyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0FBV2pDO0FBRUEsaUVBQWV2RCxTQUFTQSxFQUFDIiwic291cmNlcyI6WyIvYXBwL2NvbXBvbmVudHMvRGFzaGJvYXJkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbXBvbmVudHMvRGFzaGJvYXJkLmpzXHJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IHsgQmFyIH0gZnJvbSBcInJlYWN0LWNoYXJ0anMtMlwiO1xyXG5pbXBvcnQge1xyXG4gIENoYXJ0IGFzIENoYXJ0SlMsXHJcbiAgQ2F0ZWdvcnlTY2FsZSxcclxuICBMaW5lYXJTY2FsZSxcclxuICBCYXJFbGVtZW50LFxyXG4gIFRpdGxlLFxyXG4gIFRvb2x0aXAsXHJcbiAgTGVnZW5kLFxyXG59IGZyb20gXCJjaGFydC5qc1wiO1xyXG5cclxuQ2hhcnRKUy5yZWdpc3RlcihDYXRlZ29yeVNjYWxlLCBMaW5lYXJTY2FsZSwgQmFyRWxlbWVudCwgVGl0bGUsIFRvb2x0aXAsIExlZ2VuZCk7XHJcblxyXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XHJcbiAgY29uc3QgW2Fzc2Vzc21lbnRzLCBzZXRBc3Nlc3NtZW50c10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2ZpbHRlciwgc2V0RmlsdGVyXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICAvLyBCdXNjYSBhcyBhdmFsaWHDp8O1ZXMgYW8gY2FycmVnYXIgbyBjb21wb25lbnRlXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGZldGNoQXNzZXNzbWVudHMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoXCIvYXBpL2NvbnRyb2wtYXNzZXNzbWVudHMvXCIpO1xyXG4gICAgICAgIHNldEFzc2Vzc21lbnRzKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvIGFvIGJ1c2NhciBhdmFsaWHDp8O1ZXM6XCIsIGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGZldGNoQXNzZXNzbWVudHMoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIC8vIEZpbHRyYSBhcyBhdmFsaWHDp8O1ZXMgY29tIGJhc2Ugbm8gdGV4dG8gZGlnaXRhZG9cclxuICBjb25zdCBmaWx0ZXJlZEFzc2Vzc21lbnRzID0gYXNzZXNzbWVudHMuZmlsdGVyKChhKSA9PlxyXG4gICAgYS5xdWVzdGlvbi50ZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyLnRvTG93ZXJDYXNlKCkpXHJcbiAgKTtcclxuXHJcbiAgLy8gRGFkb3MgcGFyYSBvIGdyw6FmaWNvXHJcbiAgY29uc3QgZGF0YSA9IHtcclxuICAgIGxhYmVsczogZmlsdGVyZWRBc3Nlc3NtZW50cy5tYXAoKGEpID0+IGEucXVlc3Rpb24udGV4dCksXHJcbiAgICBkYXRhc2V0czogW1xyXG4gICAgICB7XHJcbiAgICAgICAgbGFiZWw6IFwiUG9udHVhw6fDo29cIixcclxuICAgICAgICBkYXRhOiBmaWx0ZXJlZEFzc2Vzc21lbnRzLm1hcCgoYSkgPT4gYS5zY29yZSksXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMzUsIDE3MywgMTUwLCAwLjIpXCIsXHJcbiAgICAgICAgYm9yZGVyQ29sb3I6IFwicmdiKDM1LCAxNDMsIDIzMSlcIixcclxuICAgICAgICBib3JkZXJXaWR0aDogMSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgfTtcclxuXHJcbiAgLy8gRnVuw6fDo28gcGFyYSBiYWl4YXIgcmVsYXTDs3Jpb1xyXG4gIGNvbnN0IGhhbmRsZURvd25sb2FkUmVwb3J0ID0gYXN5bmMgKGFzc2Vzc21lbnRJZCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoXHJcbiAgICAgICAgYC9hcGkvY29udHJvbC1hc3Nlc3NtZW50cy8ke2Fzc2Vzc21lbnRJZH0vZ2VuZXJhdGUtcmVwb3J0L2AsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcmVzcG9uc2VUeXBlOiBcImJsb2JcIixcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtyZXNwb25zZS5kYXRhXSkpO1xyXG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICAgIGxpbmsuaHJlZiA9IHVybDtcclxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoXCJkb3dubG9hZFwiLCBgcmVwb3J0XyR7YXNzZXNzbWVudElkfS5wZGZgKTtcclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcclxuICAgICAgbGluay5jbGljaygpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycm8gYW8gYmFpeGFyIHJlbGF0w7NyaW86XCIsIGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPGgxPkRhc2hib2FyZCBkZSBBdmFsaWHDp8O1ZXM8L2gxPlxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJGaWx0cmFyIHBvciBwZXJndW50YVwiXHJcbiAgICAgICAgdmFsdWU9e2ZpbHRlcn1cclxuICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEZpbHRlcihlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxCYXIgZGF0YT17ZGF0YX0gLz5cclxuICAgICAgPGRpdj5cclxuICAgICAgICB7ZmlsdGVyZWRBc3Nlc3NtZW50cy5tYXAoKGFzc2Vzc21lbnQpID0+IChcclxuICAgICAgICAgIDxkaXYga2V5PXthc3Nlc3NtZW50LmlkfT5cclxuICAgICAgICAgICAgPGgzPnthc3Nlc3NtZW50LnF1ZXN0aW9uLnRleHR9PC9oMz5cclxuICAgICAgICAgICAgPHA+UG9udHVhw6fDo286IHthc3Nlc3NtZW50LnNjb3JlfTwvcD5cclxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVEb3dubG9hZFJlcG9ydChhc3Nlc3NtZW50LmlkKX0+XHJcbiAgICAgICAgICAgICAgQmFpeGFyIFJlbGF0w7NyaW9cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkOyJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiYXhpb3MiLCJCYXIiLCJDaGFydCIsIkNoYXJ0SlMiLCJDYXRlZ29yeVNjYWxlIiwiTGluZWFyU2NhbGUiLCJCYXJFbGVtZW50IiwiVGl0bGUiLCJUb29sdGlwIiwiTGVnZW5kIiwicmVnaXN0ZXIiLCJEYXNoYm9hcmQiLCJhc3Nlc3NtZW50cyIsInNldEFzc2Vzc21lbnRzIiwiZmlsdGVyIiwic2V0RmlsdGVyIiwiZmV0Y2hBc3Nlc3NtZW50cyIsInJlc3BvbnNlIiwiZ2V0IiwiZGF0YSIsImVycm9yIiwiY29uc29sZSIsImZpbHRlcmVkQXNzZXNzbWVudHMiLCJhIiwicXVlc3Rpb24iLCJ0ZXh0IiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsImxhYmVscyIsIm1hcCIsImRhdGFzZXRzIiwibGFiZWwiLCJzY29yZSIsImJhY2tncm91bmRDb2xvciIsImJvcmRlckNvbG9yIiwiYm9yZGVyV2lkdGgiLCJoYW5kbGVEb3dubG9hZFJlcG9ydCIsImFzc2Vzc21lbnRJZCIsInJlc3BvbnNlVHlwZSIsInVybCIsIndpbmRvdyIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsIkJsb2IiLCJsaW5rIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsInNldEF0dHJpYnV0ZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsaWNrIiwiZGl2IiwiaDEiLCJpbnB1dCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInZhbHVlIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0IiwiYXNzZXNzbWVudCIsImgzIiwicCIsImJ1dHRvbiIsIm9uQ2xpY2siLCJpZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/Dashboard.js\n");

/***/ }),

/***/ "(pages-dir-node)/./components/Navbar.js":
/*!******************************!*\
  !*** ./components/Navbar.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(pages-dir-node)/./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst Navbar = ()=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                        href: \"/\",\n                        children: \"Home\"\n                    }, void 0, false, {\n                        fileName: \"/app/components/Navbar.js\",\n                        lineNumber: 8,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/app/components/Navbar.js\",\n                    lineNumber: 7,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                        href: \"/assessments\",\n                        children: \"Avalia\\xe7\\xe3o\"\n                    }, void 0, false, {\n                        fileName: \"/app/components/Navbar.js\",\n                        lineNumber: 11,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/app/components/Navbar.js\",\n                    lineNumber: 10,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                        href: \"/compliance\",\n                        children: \"Conformidade\"\n                    }, void 0, false, {\n                        fileName: \"/app/components/Navbar.js\",\n                        lineNumber: 14,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/app/components/Navbar.js\",\n                    lineNumber: 13,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                        href: \"/protected\",\n                        children: \"Prote\\xe7\\xe3o\"\n                    }, void 0, false, {\n                        fileName: \"/app/components/Navbar.js\",\n                        lineNumber: 17,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/app/components/Navbar.js\",\n                    lineNumber: 16,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                        href: \"/questions\",\n                        children: \"Question\\xe1rio\"\n                    }, void 0, false, {\n                        fileName: \"/app/components/Navbar.js\",\n                        lineNumber: 20,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/app/components/Navbar.js\",\n                    lineNumber: 19,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                        href: \"/dashboard\",\n                        children: \"Dashboard\"\n                    }, void 0, false, {\n                        fileName: \"/app/components/Navbar.js\",\n                        lineNumber: 23,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/app/components/Navbar.js\",\n                    lineNumber: 22,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                        href: \"/login\",\n                        children: \"Login\"\n                    }, void 0, false, {\n                        fileName: \"/app/components/Navbar.js\",\n                        lineNumber: 26,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/app/components/Navbar.js\",\n                    lineNumber: 25,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/app/components/Navbar.js\",\n            lineNumber: 6,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/app/components/Navbar.js\",\n        lineNumber: 5,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvTmF2YmFyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUE2QjtBQUU3QixNQUFNQyxTQUFTO0lBQ2IscUJBQ0UsOERBQUNDO2tCQUNDLDRFQUFDQzs7OEJBQ0MsOERBQUNDOzhCQUNDLDRFQUFDSixrREFBSUE7d0JBQUNLLE1BQUs7a0NBQUk7Ozs7Ozs7Ozs7OzhCQUVqQiw4REFBQ0Q7OEJBQ0MsNEVBQUNKLGtEQUFJQTt3QkFBQ0ssTUFBSztrQ0FBZTs7Ozs7Ozs7Ozs7OEJBRTVCLDhEQUFDRDs4QkFDQyw0RUFBQ0osa0RBQUlBO3dCQUFDSyxNQUFLO2tDQUFjOzs7Ozs7Ozs7Ozs4QkFFM0IsOERBQUNEOzhCQUNDLDRFQUFDSixrREFBSUE7d0JBQUNLLE1BQUs7a0NBQWE7Ozs7Ozs7Ozs7OzhCQUUxQiw4REFBQ0Q7OEJBQ0MsNEVBQUNKLGtEQUFJQTt3QkFBQ0ssTUFBSztrQ0FBYTs7Ozs7Ozs7Ozs7OEJBRTFCLDhEQUFDRDs4QkFDQyw0RUFBQ0osa0RBQUlBO3dCQUFDSyxNQUFLO2tDQUFhOzs7Ozs7Ozs7Ozs4QkFFMUIsOERBQUNEOzhCQUNDLDRFQUFDSixrREFBSUE7d0JBQUNLLE1BQUs7a0NBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLOUI7QUFFQSxpRUFBZUosTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiL2FwcC9jb21wb25lbnRzL05hdmJhci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XHJcblxyXG5jb25zdCBOYXZiYXIgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxuYXY+XHJcbiAgICAgIDx1bD5cclxuICAgICAgICA8bGk+XHJcbiAgICAgICAgICA8TGluayBocmVmPVwiL1wiPkhvbWU8L0xpbms+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgICA8bGk+XHJcbiAgICAgICAgICA8TGluayBocmVmPVwiL2Fzc2Vzc21lbnRzXCI+QXZhbGlhw6fDo288L0xpbms+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgICA8bGk+XHJcbiAgICAgICAgICA8TGluayBocmVmPVwiL2NvbXBsaWFuY2VcIj5Db25mb3JtaWRhZGU8L0xpbms+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgICA8bGk+XHJcbiAgICAgICAgICA8TGluayBocmVmPVwiL3Byb3RlY3RlZFwiPlByb3Rlw6fDo288L0xpbms+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgICA8bGk+XHJcbiAgICAgICAgICA8TGluayBocmVmPVwiL3F1ZXN0aW9uc1wiPlF1ZXN0aW9uw6FyaW88L0xpbms+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgICA8bGk+XHJcbiAgICAgICAgICA8TGluayBocmVmPVwiL2Rhc2hib2FyZFwiPkRhc2hib2FyZDwvTGluaz5cclxuICAgICAgICA8L2xpPlxyXG4gICAgICAgIDxsaT5cclxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvbG9naW5cIj5Mb2dpbjwvTGluaz5cclxuICAgICAgICA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgPC9uYXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5hdmJhcjtcclxuIl0sIm5hbWVzIjpbIkxpbmsiLCJOYXZiYXIiLCJuYXYiLCJ1bCIsImxpIiwiaHJlZiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/Navbar.js\n");

/***/ }),

/***/ "(pages-dir-node)/./hooks/useAuth.js":
/*!**************************!*\
  !*** ./hooks/useAuth.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/api */ \"(pages-dir-node)/./services/api.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_services_api__WEBPACK_IMPORTED_MODULE_2__]);\n_services_api__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n// Cria o contexto de autenticação\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\n// Provedor de autenticação que envolve a aplicação\nconst AuthProvider = ({ children })=>{\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"AuthProvider.useEffect\": ()=>{\n            const token = localStorage.getItem(\"token\");\n            if (token) {\n                _services_api__WEBPACK_IMPORTED_MODULE_2__[\"default\"].defaults.headers.Authorization = `Bearer ${token}`;\n                _services_api__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"/auth/user/\").then({\n                    \"AuthProvider.useEffect\": (response)=>{\n                        setUser(response.data);\n                    }\n                }[\"AuthProvider.useEffect\"]).catch({\n                    \"AuthProvider.useEffect\": ()=>{\n                        logout();\n                    }\n                }[\"AuthProvider.useEffect\"]);\n            }\n        }\n    }[\"AuthProvider.useEffect\"], []);\n    const login = async (email, password)=>{\n        try {\n            const response = await _services_api__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(\"/auth/login/\", {\n                email,\n                password\n            });\n            localStorage.setItem(\"token\", response.data.token);\n            _services_api__WEBPACK_IMPORTED_MODULE_2__[\"default\"].defaults.headers.Authorization = `Bearer ${response.data.token}`;\n            setUser(response.data.user);\n            router.push(\"/dashboard\");\n        } catch (error) {\n            console.error(\"Erro ao fazer login:\", error);\n            alert(\"Credenciais inválidas!\");\n        }\n    };\n    const logout = ()=>{\n        localStorage.removeItem(\"token\");\n        setUser(null);\n        _services_api__WEBPACK_IMPORTED_MODULE_2__[\"default\"].defaults.headers.Authorization = null;\n        router.push(\"/login\");\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            login,\n            logout\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/app/hooks/useAuth.js\",\n        lineNumber: 50,\n        columnNumber: 5\n    }, undefined);\n};\n// Hook personalizado para usar o contexto de autenticação\nconst useAuth = ()=>{\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext); // Certifique-se de que está retornando o contexto\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2hvb2tzL3VzZUF1dGguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUF1RTtBQUNyQztBQUNNO0FBRXhDLGtDQUFrQztBQUNsQyxNQUFNTSw0QkFBY0osb0RBQWFBO0FBRWpDLG1EQUFtRDtBQUM1QyxNQUFNSyxlQUFlLENBQUMsRUFBRUMsUUFBUSxFQUFFO0lBQ3ZDLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHViwrQ0FBUUEsQ0FBQztJQUNqQyxNQUFNVyxTQUFTTixzREFBU0E7SUFFeEJKLGdEQUFTQTtrQ0FBQztZQUNSLE1BQU1XLFFBQVFDLGFBQWFDLE9BQU8sQ0FBQztZQUVuQyxJQUFJRixPQUFPO2dCQUNUUiw4REFBWSxDQUFDWSxPQUFPLENBQUNDLGFBQWEsR0FBRyxDQUFDLE9BQU8sRUFBRUwsT0FBTztnQkFFdERSLHlEQUFPLENBQUMsZUFDTGUsSUFBSTs4Q0FBQyxDQUFDQzt3QkFDTFYsUUFBUVUsU0FBU0MsSUFBSTtvQkFDdkI7NkNBQ0NDLEtBQUs7OENBQUM7d0JBQ0xDO29CQUNGOztZQUNKO1FBQ0Y7aUNBQUcsRUFBRTtJQUVMLE1BQU1DLFFBQVEsT0FBT0MsT0FBT0M7UUFDMUIsSUFBSTtZQUNGLE1BQU1OLFdBQVcsTUFBTWhCLDBEQUFRLENBQUMsZ0JBQWdCO2dCQUFFcUI7Z0JBQU9DO1lBQVM7WUFDbEViLGFBQWFlLE9BQU8sQ0FBQyxTQUFTUixTQUFTQyxJQUFJLENBQUNULEtBQUs7WUFDakRSLDhEQUFZLENBQUNZLE9BQU8sQ0FBQ0MsYUFBYSxHQUFHLENBQUMsT0FBTyxFQUFFRyxTQUFTQyxJQUFJLENBQUNULEtBQUssRUFBRTtZQUNwRUYsUUFBUVUsU0FBU0MsSUFBSSxDQUFDWixJQUFJO1lBQzFCRSxPQUFPa0IsSUFBSSxDQUFDO1FBQ2QsRUFBRSxPQUFPQyxPQUFPO1lBQ2RDLFFBQVFELEtBQUssQ0FBQyx3QkFBd0JBO1lBQ3RDRSxNQUFNO1FBQ1I7SUFDRjtJQUVBLE1BQU1ULFNBQVM7UUFDYlYsYUFBYW9CLFVBQVUsQ0FBQztRQUN4QnZCLFFBQVE7UUFDUk4sOERBQVksQ0FBQ1ksT0FBTyxDQUFDQyxhQUFhLEdBQUc7UUFDckNOLE9BQU9rQixJQUFJLENBQUM7SUFDZDtJQUVBLHFCQUNFLDhEQUFDdkIsWUFBWTRCLFFBQVE7UUFBQ0MsT0FBTztZQUFFMUI7WUFBTWU7WUFBT0Q7UUFBTztrQkFDaERmOzs7Ozs7QUFHUCxFQUFFO0FBRUYsMERBQTBEO0FBQ25ELE1BQU00QixVQUFVO0lBQ3JCLE9BQU9qQyxpREFBVUEsQ0FBQ0csY0FBYyxrREFBa0Q7QUFDcEYsRUFBRSIsInNvdXJjZXMiOlsiL2FwcC9ob29rcy91c2VBdXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IEFQSSBmcm9tIFwiLi4vc2VydmljZXMvYXBpXCI7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xyXG5cclxuLy8gQ3JpYSBvIGNvbnRleHRvIGRlIGF1dGVudGljYcOnw6NvXHJcbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpO1xyXG5cclxuLy8gUHJvdmVkb3IgZGUgYXV0ZW50aWNhw6fDo28gcXVlIGVudm9sdmUgYSBhcGxpY2HDp8Ojb1xyXG5leHBvcnQgY29uc3QgQXV0aFByb3ZpZGVyID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xyXG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpO1xyXG5cclxuICAgIGlmICh0b2tlbikge1xyXG4gICAgICBBUEkuZGVmYXVsdHMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XHJcblxyXG4gICAgICBBUEkuZ2V0KFwiL2F1dGgvdXNlci9cIilcclxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIHNldFVzZXIocmVzcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgbG9nb3V0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBsb2dpbiA9IGFzeW5jIChlbWFpbCwgcGFzc3dvcmQpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgQVBJLnBvc3QoXCIvYXV0aC9sb2dpbi9cIiwgeyBlbWFpbCwgcGFzc3dvcmQgfSk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9rZW5cIiwgcmVzcG9uc2UuZGF0YS50b2tlbik7XHJcbiAgICAgIEFQSS5kZWZhdWx0cy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7cmVzcG9uc2UuZGF0YS50b2tlbn1gO1xyXG4gICAgICBzZXRVc2VyKHJlc3BvbnNlLmRhdGEudXNlcik7XHJcbiAgICAgIHJvdXRlci5wdXNoKFwiL2Rhc2hib2FyZFwiKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvIGFvIGZhemVyIGxvZ2luOlwiLCBlcnJvcik7XHJcbiAgICAgIGFsZXJ0KFwiQ3JlZGVuY2lhaXMgaW52w6FsaWRhcyFcIik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJ0b2tlblwiKTtcclxuICAgIHNldFVzZXIobnVsbCk7XHJcbiAgICBBUEkuZGVmYXVsdHMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gbnVsbDtcclxuICAgIHJvdXRlci5wdXNoKFwiL2xvZ2luXCIpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgdXNlciwgbG9naW4sIGxvZ291dCB9fT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gSG9vayBwZXJzb25hbGl6YWRvIHBhcmEgdXNhciBvIGNvbnRleHRvIGRlIGF1dGVudGljYcOnw6NvXHJcbmV4cG9ydCBjb25zdCB1c2VBdXRoID0gKCkgPT4ge1xyXG4gIHJldHVybiB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTsgLy8gQ2VydGlmaXF1ZS1zZSBkZSBxdWUgZXN0w6EgcmV0b3JuYW5kbyBvIGNvbnRleHRvXHJcbn07XHJcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwiQVBJIiwidXNlUm91dGVyIiwiQXV0aENvbnRleHQiLCJBdXRoUHJvdmlkZXIiLCJjaGlsZHJlbiIsInVzZXIiLCJzZXRVc2VyIiwicm91dGVyIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsImRhdGEiLCJjYXRjaCIsImxvZ291dCIsImxvZ2luIiwiZW1haWwiLCJwYXNzd29yZCIsInBvc3QiLCJzZXRJdGVtIiwicHVzaCIsImVycm9yIiwiY29uc29sZSIsImFsZXJ0IiwicmVtb3ZlSXRlbSIsIlByb3ZpZGVyIiwidmFsdWUiLCJ1c2VBdXRoIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./hooks/useAuth.js\n");

/***/ }),

/***/ "(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fdashboard&preferredRegion=&absolutePagePath=.%2Fpages%2Fdashboard.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fdashboard&preferredRegion=&absolutePagePath=.%2Fpages%2Fdashboard.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   getServerSideProps: () => (/* binding */ getServerSideProps),\n/* harmony export */   getStaticPaths: () => (/* binding */ getStaticPaths),\n/* harmony export */   getStaticProps: () => (/* binding */ getStaticProps),\n/* harmony export */   reportWebVitals: () => (/* binding */ reportWebVitals),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   unstable_getServerProps: () => (/* binding */ unstable_getServerProps),\n/* harmony export */   unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),\n/* harmony export */   unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),\n/* harmony export */   unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),\n/* harmony export */   unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/pages/module.compiled */ \"(pages-dir-node)/./node_modules/next/dist/server/route-modules/pages/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(pages-dir-node)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(pages-dir-node)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! private-next-pages/_document */ \"(pages-dir-node)/./node_modules/next/dist/pages/_document.js\");\n/* harmony import */ var private_next_pages_document__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(private_next_pages_document__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! private-next-pages/_app */ \"(pages-dir-node)/./pages/_app.js\");\n/* harmony import */ var _pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/dashboard.js */ \"(pages-dir-node)/./pages/dashboard.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__, _pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__]);\n([private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__, _pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n// Import the app and document modules.\n\n\n// Import the userland code.\n\n// Re-export the component (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__, 'default'));\n// Re-export methods.\nconst getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__, 'getStaticProps');\nconst getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__, 'getStaticPaths');\nconst getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__, 'getServerSideProps');\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__, 'config');\nconst reportWebVitals = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__, 'reportWebVitals');\n// Re-export legacy methods.\nconst unstable_getStaticProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticProps');\nconst unstable_getStaticPaths = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticPaths');\nconst unstable_getStaticParams = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getStaticParams');\nconst unstable_getServerProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerProps');\nconst unstable_getServerSideProps = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__, 'unstable_getServerSideProps');\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_route_modules_pages_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES,\n        page: \"/dashboard\",\n        pathname: \"/dashboard\",\n        // The following aren't used in production.\n        bundlePath: '',\n        filename: ''\n    },\n    components: {\n        // default export might not exist when optimized for data only\n        App: private_next_pages_app__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n        Document: (private_next_pages_document__WEBPACK_IMPORTED_MODULE_3___default())\n    },\n    userland: _pages_dashboard_js__WEBPACK_IMPORTED_MODULE_5__\n});\n\n//# sourceMappingURL=pages.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtcm91dGUtbG9hZGVyL2luZGV4LmpzP2tpbmQ9UEFHRVMmcGFnZT0lMkZkYXNoYm9hcmQmcHJlZmVycmVkUmVnaW9uPSZhYnNvbHV0ZVBhZ2VQYXRoPS4lMkZwYWdlcyUyRmRhc2hib2FyZC5qcyZhYnNvbHV0ZUFwcFBhdGg9cHJpdmF0ZS1uZXh0LXBhZ2VzJTJGX2FwcCZhYnNvbHV0ZURvY3VtZW50UGF0aD1wcml2YXRlLW5leHQtcGFnZXMlMkZfZG9jdW1lbnQmbWlkZGxld2FyZUNvbmZpZ0Jhc2U2ND1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdGO0FBQ2hDO0FBQ0U7QUFDMUQ7QUFDeUQ7QUFDVjtBQUMvQztBQUNpRDtBQUNqRDtBQUNBLGlFQUFlLHdFQUFLLENBQUMsZ0RBQVEsWUFBWSxFQUFDO0FBQzFDO0FBQ08sdUJBQXVCLHdFQUFLLENBQUMsZ0RBQVE7QUFDckMsdUJBQXVCLHdFQUFLLENBQUMsZ0RBQVE7QUFDckMsMkJBQTJCLHdFQUFLLENBQUMsZ0RBQVE7QUFDekMsZUFBZSx3RUFBSyxDQUFDLGdEQUFRO0FBQzdCLHdCQUF3Qix3RUFBSyxDQUFDLGdEQUFRO0FBQzdDO0FBQ08sZ0NBQWdDLHdFQUFLLENBQUMsZ0RBQVE7QUFDOUMsZ0NBQWdDLHdFQUFLLENBQUMsZ0RBQVE7QUFDOUMsaUNBQWlDLHdFQUFLLENBQUMsZ0RBQVE7QUFDL0MsZ0NBQWdDLHdFQUFLLENBQUMsZ0RBQVE7QUFDOUMsb0NBQW9DLHdFQUFLLENBQUMsZ0RBQVE7QUFDekQ7QUFDTyx3QkFBd0Isa0dBQWdCO0FBQy9DO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhLDhEQUFXO0FBQ3hCLGtCQUFrQixvRUFBZ0I7QUFDbEMsS0FBSztBQUNMLFlBQVk7QUFDWixDQUFDOztBQUVELGlDIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnZXNSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvcGFnZXMvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBob2lzdCB9IGZyb20gXCJuZXh0L2Rpc3QvYnVpbGQvdGVtcGxhdGVzL2hlbHBlcnNcIjtcbi8vIEltcG9ydCB0aGUgYXBwIGFuZCBkb2N1bWVudCBtb2R1bGVzLlxuaW1wb3J0ICogYXMgZG9jdW1lbnQgZnJvbSBcInByaXZhdGUtbmV4dC1wYWdlcy9fZG9jdW1lbnRcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwicHJpdmF0ZS1uZXh0LXBhZ2VzL19hcHBcIjtcbi8vIEltcG9ydCB0aGUgdXNlcmxhbmQgY29kZS5cbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIuL3BhZ2VzL2Rhc2hib2FyZC5qc1wiO1xuLy8gUmUtZXhwb3J0IHRoZSBjb21wb25lbnQgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsICdkZWZhdWx0Jyk7XG4vLyBSZS1leHBvcnQgbWV0aG9kcy5cbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAnZ2V0U3RhdGljUHJvcHMnKTtcbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQYXRocyA9IGhvaXN0KHVzZXJsYW5kLCAnZ2V0U3RhdGljUGF0aHMnKTtcbmV4cG9ydCBjb25zdCBnZXRTZXJ2ZXJTaWRlUHJvcHMgPSBob2lzdCh1c2VybGFuZCwgJ2dldFNlcnZlclNpZGVQcm9wcycpO1xuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IGhvaXN0KHVzZXJsYW5kLCAnY29uZmlnJyk7XG5leHBvcnQgY29uc3QgcmVwb3J0V2ViVml0YWxzID0gaG9pc3QodXNlcmxhbmQsICdyZXBvcnRXZWJWaXRhbHMnKTtcbi8vIFJlLWV4cG9ydCBsZWdhY3kgbWV0aG9kcy5cbmV4cG9ydCBjb25zdCB1bnN0YWJsZV9nZXRTdGF0aWNQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U3RhdGljUHJvcHMnKTtcbmV4cG9ydCBjb25zdCB1bnN0YWJsZV9nZXRTdGF0aWNQYXRocyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U3RhdGljUGF0aHMnKTtcbmV4cG9ydCBjb25zdCB1bnN0YWJsZV9nZXRTdGF0aWNQYXJhbXMgPSBob2lzdCh1c2VybGFuZCwgJ3Vuc3RhYmxlX2dldFN0YXRpY1BhcmFtcycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFNlcnZlclByb3BzID0gaG9pc3QodXNlcmxhbmQsICd1bnN0YWJsZV9nZXRTZXJ2ZXJQcm9wcycpO1xuZXhwb3J0IGNvbnN0IHVuc3RhYmxlX2dldFNlcnZlclNpZGVQcm9wcyA9IGhvaXN0KHVzZXJsYW5kLCAndW5zdGFibGVfZ2V0U2VydmVyU2lkZVByb3BzJyk7XG4vLyBDcmVhdGUgYW5kIGV4cG9ydCB0aGUgcm91dGUgbW9kdWxlIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cbmV4cG9ydCBjb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBQYWdlc1JvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5QQUdFUyxcbiAgICAgICAgcGFnZTogXCIvZGFzaGJvYXJkXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9kYXNoYm9hcmRcIixcbiAgICAgICAgLy8gVGhlIGZvbGxvd2luZyBhcmVuJ3QgdXNlZCBpbiBwcm9kdWN0aW9uLlxuICAgICAgICBidW5kbGVQYXRoOiAnJyxcbiAgICAgICAgZmlsZW5hbWU6ICcnXG4gICAgfSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIC8vIGRlZmF1bHQgZXhwb3J0IG1pZ2h0IG5vdCBleGlzdCB3aGVuIG9wdGltaXplZCBmb3IgZGF0YSBvbmx5XG4gICAgICAgIEFwcDogYXBwLmRlZmF1bHQsXG4gICAgICAgIERvY3VtZW50OiBkb2N1bWVudC5kZWZhdWx0XG4gICAgfSxcbiAgICB1c2VybGFuZFxufSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhZ2VzLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fdashboard&preferredRegion=&absolutePagePath=.%2Fpages%2Fdashboard.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Navbar */ \"(pages-dir-node)/./components/Navbar.js\");\n/* harmony import */ var _barrel_optimize_names_CssBaseline_mui_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=CssBaseline!=!@mui/material */ \"(pages-dir-node)/__barrel_optimize__?names=CssBaseline!=!./node_modules/@mui/material/index.js\");\n/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useAuth */ \"(pages-dir-node)/./hooks/useAuth.js\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_4__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__]);\n_hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// frontend/pages/_app.js\n\n\n\n\n\n\nconst MyApp = ({ Component, pageProps })=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__.AuthProvider, {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_CssBaseline_mui_material__WEBPACK_IMPORTED_MODULE_5__.CssBaseline, {}, void 0, false, {\n                    fileName: \"/app/pages/_app.js\",\n                    lineNumber: 12,\n                    columnNumber: 7\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                    fileName: \"/app/pages/_app.js\",\n                    lineNumber: 13,\n                    columnNumber: 7\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"/app/pages/_app.js\",\n                    lineNumber: 14,\n                    columnNumber: 7\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/app/pages/_app.js\",\n            lineNumber: 11,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlCQUF5Qjs7QUFDQztBQUNnQjtBQUNFO0FBQ0k7QUFDakI7QUFFL0IsTUFBTUksUUFBUSxDQUFDLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBQ3JDLHFCQUNFO2tCQUNFLDRFQUFDSCx3REFBWUE7OzhCQUNiLDhEQUFDRCx3RkFBV0E7Ozs7OzhCQUNaLDhEQUFDRCwwREFBTUE7Ozs7OzhCQUNQLDhEQUFDSTtvQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7O0FBSTlCO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIi9hcHAvcGFnZXMvX2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBmcm9udGVuZC9wYWdlcy9fYXBwLmpzXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IE5hdmJhciBmcm9tIFwiLi4vY29tcG9uZW50cy9OYXZiYXJcIjtcclxuaW1wb3J0IHsgQ3NzQmFzZWxpbmUgfSBmcm9tIFwiQG11aS9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tIFwiLi4vaG9va3MvdXNlQXV0aFwiO1xyXG5pbXBvcnQgXCIuLi9zdHlsZXMvZ2xvYmFscy5jc3NcIjtcclxuXHJcbmNvbnN0IE15QXBwID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8QXV0aFByb3ZpZGVyPlxyXG4gICAgICA8Q3NzQmFzZWxpbmUgLz5cclxuICAgICAgPE5hdmJhciAvPlxyXG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgIDwvQXV0aFByb3ZpZGVyPlxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE15QXBwO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJOYXZiYXIiLCJDc3NCYXNlbGluZSIsIkF1dGhQcm92aWRlciIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/dashboard.js":
/*!****************************!*\
  !*** ./pages/dashboard.js ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Dashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Dashboard */ \"(pages-dir-node)/./components/Dashboard.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_Dashboard__WEBPACK_IMPORTED_MODULE_2__]);\n_components_Dashboard__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// pages/dashboard.js\n\n\n\nconst DashboardPage = ()=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Dashboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n            fileName: \"/app/pages/dashboard.js\",\n            lineNumber: 8,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/app/pages/dashboard.js\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DashboardPage);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL2Rhc2hib2FyZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQkFBcUI7O0FBQ0s7QUFDc0I7QUFFaEQsTUFBTUUsZ0JBQWdCO0lBQ3BCLHFCQUNFLDhEQUFDQztrQkFDQyw0RUFBQ0YsNkRBQVNBOzs7Ozs7Ozs7O0FBR2hCO0FBRUEsaUVBQWVDLGFBQWFBLEVBQUMiLCJzb3VyY2VzIjpbIi9hcHAvcGFnZXMvZGFzaGJvYXJkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL2Rhc2hib2FyZC5qc1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSBcIi4uL2NvbXBvbmVudHMvRGFzaGJvYXJkXCI7XHJcblxyXG5jb25zdCBEYXNoYm9hcmRQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8RGFzaGJvYXJkIC8+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGFzaGJvYXJkUGFnZTtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiRGFzaGJvYXJkIiwiRGFzaGJvYXJkUGFnZSIsImRpdiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/dashboard.js\n");

/***/ }),

/***/ "(pages-dir-node)/./services/api.js":
/*!*************************!*\
  !*** ./services/api.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst API = axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n    baseURL: \"http://localhost:8000\",\n    headers: {\n        \"Content-Type\": \"application/json\"\n    }\n});\n// Adiciona o token CSRF automaticamente\nAPI.interceptors.request.use((config)=>{\n    const csrfToken = document.cookie.split('; ').find((row)=>row.startsWith('csrftoken='))?.split('=')[1];\n    if (csrfToken) {\n        config.headers['X-CSRFToken'] = csrfToken;\n    }\n    return config;\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (API);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3NlcnZpY2VzL2FwaS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEwQjtBQUUxQixNQUFNQyxNQUFNRCxvREFBWSxDQUFDO0lBQ3ZCRyxTQUFTO0lBQ1RDLFNBQVM7UUFDUCxnQkFBZ0I7SUFDbEI7QUFDRjtBQUVBLHdDQUF3QztBQUN4Q0gsSUFBSUksWUFBWSxDQUFDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUFDQztJQUM1QixNQUFNQyxZQUFZQyxTQUFTQyxNQUFNLENBQzlCQyxLQUFLLENBQUMsTUFDTkMsSUFBSSxDQUFDQyxDQUFBQSxNQUFPQSxJQUFJQyxVQUFVLENBQUMsZ0JBQzFCSCxNQUFNLElBQUksQ0FBQyxFQUFFO0lBRWpCLElBQUlILFdBQVc7UUFDYkQsT0FBT0osT0FBTyxDQUFDLGNBQWMsR0FBR0s7SUFDbEM7SUFFQSxPQUFPRDtBQUNUO0FBRUEsaUVBQWVQLEdBQUdBLEVBQUMiLCJzb3VyY2VzIjpbIi9hcHAvc2VydmljZXMvYXBpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcclxuXHJcbmNvbnN0IEFQSSA9IGF4aW9zLmNyZWF0ZSh7XHJcbiAgYmFzZVVSTDogXCJodHRwOi8vbG9jYWxob3N0OjgwMDBcIiwgLy8gVVJMIGRvIGJhY2tlbmRcclxuICBoZWFkZXJzOiB7XHJcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICB9LFxyXG59KTtcclxuXHJcbi8vIEFkaWNpb25hIG8gdG9rZW4gQ1NSRiBhdXRvbWF0aWNhbWVudGVcclxuQVBJLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZSgoY29uZmlnKSA9PiB7XHJcbiAgY29uc3QgY3NyZlRva2VuID0gZG9jdW1lbnQuY29va2llXHJcbiAgICAuc3BsaXQoJzsgJylcclxuICAgIC5maW5kKHJvdyA9PiByb3cuc3RhcnRzV2l0aCgnY3NyZnRva2VuPScpKVxyXG4gICAgPy5zcGxpdCgnPScpWzFdO1xyXG5cclxuICBpZiAoY3NyZlRva2VuKSB7XHJcbiAgICBjb25maWcuaGVhZGVyc1snWC1DU1JGVG9rZW4nXSA9IGNzcmZUb2tlbjtcclxuICB9XHJcblxyXG4gIHJldHVybiBjb25maWc7XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQVBJOyJdLCJuYW1lcyI6WyJheGlvcyIsIkFQSSIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXJzIiwiaW50ZXJjZXB0b3JzIiwicmVxdWVzdCIsInVzZSIsImNvbmZpZyIsImNzcmZUb2tlbiIsImRvY3VtZW50IiwiY29va2llIiwic3BsaXQiLCJmaW5kIiwicm93Iiwic3RhcnRzV2l0aCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./services/api.js\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "(pages-dir-node)/__barrel_optimize__?names=CssBaseline!=!./node_modules/@mui/material/index.js":
/*!*************************************************************************************!*\
  !*** __barrel_optimize__?names=CssBaseline!=!./node_modules/@mui/material/index.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CssBaseline: () => (/* reexport safe */ _CssBaseline_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _CssBaseline_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CssBaseline/index.js */ "(pages-dir-node)/./node_modules/@mui/material/CssBaseline/index.js");



/***/ }),

/***/ "@mui/system":
/*!******************************!*\
  !*** external "@mui/system" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system");

/***/ }),

/***/ "@mui/system/DefaultPropsProvider":
/*!***************************************************!*\
  !*** external "@mui/system/DefaultPropsProvider" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/DefaultPropsProvider");

/***/ }),

/***/ "@mui/system/colorManipulator":
/*!***********************************************!*\
  !*** external "@mui/system/colorManipulator" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/colorManipulator");

/***/ }),

/***/ "@mui/system/createStyled":
/*!*******************************************!*\
  !*** external "@mui/system/createStyled" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/createStyled");

/***/ }),

/***/ "@mui/system/createTheme":
/*!******************************************!*\
  !*** external "@mui/system/createTheme" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/createTheme");

/***/ }),

/***/ "@mui/system/cssVars":
/*!**************************************!*\
  !*** external "@mui/system/cssVars" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/cssVars");

/***/ }),

/***/ "@mui/system/spacing":
/*!**************************************!*\
  !*** external "@mui/system/spacing" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/spacing");

/***/ }),

/***/ "@mui/system/styleFunctionSx":
/*!**********************************************!*\
  !*** external "@mui/system/styleFunctionSx" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system/styleFunctionSx");

/***/ }),

/***/ "@mui/utils/deepmerge":
/*!***************************************!*\
  !*** external "@mui/utils/deepmerge" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/deepmerge");

/***/ }),

/***/ "@mui/utils/formatMuiErrorMessage":
/*!***************************************************!*\
  !*** external "@mui/utils/formatMuiErrorMessage" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/formatMuiErrorMessage");

/***/ }),

/***/ "@mui/utils/generateUtilityClass":
/*!**************************************************!*\
  !*** external "@mui/utils/generateUtilityClass" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/utils/generateUtilityClass");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ }),

/***/ "chart.js":
/*!***************************!*\
  !*** external "chart.js" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = import("chart.js");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-chartjs-2":
/*!**********************************!*\
  !*** external "react-chartjs-2" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = import("react-chartjs-2");;

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/@mui"], () => (__webpack_exec__("(pages-dir-node)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES&page=%2Fdashboard&preferredRegion=&absolutePagePath=.%2Fpages%2Fdashboard.js&absoluteAppPath=private-next-pages%2F_app&absoluteDocumentPath=private-next-pages%2F_document&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();