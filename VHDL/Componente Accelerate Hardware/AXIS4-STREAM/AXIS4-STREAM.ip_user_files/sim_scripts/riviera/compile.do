transcript off
onbreak {quit -force}
onerror {quit -force}
transcript on

vlib work
vlib riviera/xpm
vlib riviera/axis_infrastructure_v1_1_1
vlib riviera/axis_data_fifo_v2_0_13
vlib riviera/xil_defaultlib

vmap xpm riviera/xpm
vmap axis_infrastructure_v1_1_1 riviera/axis_infrastructure_v1_1_1
vmap axis_data_fifo_v2_0_13 riviera/axis_data_fifo_v2_0_13
vmap xil_defaultlib riviera/xil_defaultlib

vlog -work xpm  -incr "+incdir+../../../AXIS4-STREAM.gen/sources_1/ip/axis_data_fifo_0/hdl" -l xpm -l axis_infrastructure_v1_1_1 -l axis_data_fifo_v2_0_13 -l xil_defaultlib \
"C:/Vivado/2024.1/data/ip/xpm/xpm_cdc/hdl/xpm_cdc.sv" \
"C:/Vivado/2024.1/data/ip/xpm/xpm_fifo/hdl/xpm_fifo.sv" \
"C:/Vivado/2024.1/data/ip/xpm/xpm_memory/hdl/xpm_memory.sv" \

vcom -work xpm -93  -incr \
"C:/Vivado/2024.1/data/ip/xpm/xpm_VCOMP.vhd" \

vlog -work axis_infrastructure_v1_1_1  -incr -v2k5 "+incdir+../../../AXIS4-STREAM.gen/sources_1/ip/axis_data_fifo_0/hdl" -l xpm -l axis_infrastructure_v1_1_1 -l axis_data_fifo_v2_0_13 -l xil_defaultlib \
"../../ipstatic/hdl/axis_infrastructure_v1_1_vl_rfs.v" \

vlog -work axis_data_fifo_v2_0_13  -incr -v2k5 "+incdir+../../../AXIS4-STREAM.gen/sources_1/ip/axis_data_fifo_0/hdl" -l xpm -l axis_infrastructure_v1_1_1 -l axis_data_fifo_v2_0_13 -l xil_defaultlib \
"../../ipstatic/hdl/axis_data_fifo_v2_0_vl_rfs.v" \

vlog -work xil_defaultlib  -incr -v2k5 "+incdir+../../../AXIS4-STREAM.gen/sources_1/ip/axis_data_fifo_0/hdl" -l xpm -l axis_infrastructure_v1_1_1 -l axis_data_fifo_v2_0_13 -l xil_defaultlib \
"../../../AXIS4-STREAM.gen/sources_1/ip/axis_data_fifo_0/sim/axis_data_fifo_0.v" \

vcom -work xil_defaultlib -93  -incr \
"../../../AXIS4-STREAM.srcs/sources_1/new/MPG.vhd" \
"../../../AXIS4-STREAM.srcs/sources_1/new/axis_receiver.vhd" \
"../../../AXIS4-STREAM.srcs/sources_1/new/axis_transmitter.vhd" \
"../../../AXIS4-STREAM.srcs/sources_1/new/top.vhd" \

vlog -work xil_defaultlib \
"glbl.v"

