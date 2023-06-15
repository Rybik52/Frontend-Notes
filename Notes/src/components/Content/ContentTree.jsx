import React, { useState, useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';
import PropTypes from "prop-types";
import { baseURL } from "../../FetchData/imports.jsx";
import axios from "axios";

export default function ContentTree({ data }) {
    const [orgChart, setOrgChart] = useState(null); // Используем состояние для хранения дерева данных

    useEffect(() => {
        // Создаем дерево данных только при изменении входных данных (data)
        if (data) {
            const fetchData = async () => {
                const transformedData = {
                    name: 'Заметки',
                    children: await Promise.all(
                        data.map(async (item) => {
                            const children = await Promise.all(
                                item.recordIds.map(async (recordId) => {
                                    const response = await axios.get(baseURL + recordId);
                                    return {
                                        name: `Связан с ID:${recordId} - ${response.data.title}`,
                                    };
                                })
                            );
                            return {
                                name: item.title,
                                attributes: {
                                    id: item.id,
                                    tags: item.tags.join(', '),
                                    date: new Date(item.date).toLocaleString("ru-RU"),
                                    collection: item.text,
                                },
                                children,
                            };
                        })
                    ),
                };
                setOrgChart(transformedData);
            };

            fetchData();
        }
    }, [data]);

    const [selectedNode, setSelectedNode] = useState(null);
    const treeRef = useRef(null);

    const handleNodeClick = (nodeData) => {
        setSelectedNode(nodeData);
        centerNode(nodeData);
    };

    const centerNode = (nodeData) => {
        if (treeRef.current) {
            treeRef.current.centerNode(nodeData);
        }
    };


    const renderRectSvgNode = ({ nodeDatum, toggleNode= {} }) => (
        <React.Fragment>
            <g>
                <rect x="0" y="-15" width="30" height="30" fill="#fecc7d" onClick={toggleNode} />
                <foreignObject dy='200' width="300" height="300" x="-150" y="50">
                    <div style={{
                        cursor: 'auto',
                        color: 'black',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px solid black',
                        paddingBottom: '1rem',
                        backgroundColor: 'rgb(248, 248, 255)'
                    }}
                    >
                        <h2>{nodeDatum.name}</h2>
                        {
                            nodeDatum.attributes?.id && (
                            <span>id: {nodeDatum.attributes?.id}</span>
                        )}
                        {
                            nodeDatum.attributes?.tags && (
                            <span>Тэги: {nodeDatum.attributes?.tags}</span>
                        )}
                        {
                            nodeDatum.attributes?.date && (
                            <span>Дата и время: {nodeDatum.attributes?.date}</span>
                        )}
                        {
                            nodeDatum.attributes?.collection && (
                            <span>Коллекция: {nodeDatum.attributes?.collection}</span>
                        )}
                    </div>
                </foreignObject>
            </g>
        </React.Fragment>
    );

    let StartTranslate ={x: 300, y: 300};
    const svgSquare = {
        shape: 'rect',
        shapeProps: {
            width: 0,
            height: 0,
            onClick: handleNodeClick,
            className: (nodeData) =>
                selectedNode === nodeData ? 'node-selected' : ''
        }
    };

    return (
        <div style={{ height: '70vh', background: '#333' }}>
            {orgChart && (
                <Tree
                    ref={treeRef}
                    data={orgChart}
                    rootNodeClassName="node__root"
                    branchNodeClassName="node__branch"
                    leafNodeClassName="node__leaf"
                    initialDepth={1}
                    depthFactor={400}
                    pathFunc="step"
                    Nosiblings
                    nodeSize={{ x: 100, y: 250 }}
                    transitionDuration={300}
                    translate={StartTranslate}
                    renderCustomNodeElement={renderRectSvgNode}
                    nodeSvgShape={svgSquare}
                />
            )}
        </div>
    );
}

ContentTree.propTypes = {
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
};