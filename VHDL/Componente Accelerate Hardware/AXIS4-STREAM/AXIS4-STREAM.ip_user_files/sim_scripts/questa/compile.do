vlib questa_lib/work
vlib questa_lib/msim

vlib questa_lib/msim/xpm
vlib questa_lib/msim/axis_infrastructure_v1_1_1
vlib questa_lib/msim/axis_data_fifo_v2_0_13
vlib questa_lib/msim/xil_defaultlib

vmap xpm questa_lib/msim/xpm
vmap axis_infrastructure_v1_1_1 questa_lib/msim/axis_infrastructure_v1_1_1
vmap axis_data_fifo_v2_0_13 questa_lib/msim/axis_data_fifo_v2_0_13
vmap xil_defaultlib questa_lib/msim/xil_defaultlib

vlog -work xpm  -incr -mfcu  -sv "+incdir+../../../AXIS4-STREAM.gen/sources_1/ip/axis_data_fifo_0/hdl" \
"C:/Vivado/2024.1/data/ip/xpm/xpm_cdc/hdl/xpm_cdc.sv" \
"C:/Vivado/2024.1/data/ip/xpm/xpm_fifo/hdl/xpm_fifo.sv" \
"C:/Vivado/2024.1/data/ip/xpm/xpm_memory/hdl/xpm_memory.sv" \

vcom -work xpm  -93  \
"C:/Vivado/2024.1/data/ip/xpm/xpm_VCOMP.vhd" \

vlog -work axis_infrastructure_v1_1_1  -incr -mfcu  "+incdir+../../../AXIS4-STREAM.gen/sources_1/ip/axis_data_fifo_0/hdl" \
"../../ipstatic/hdl/axis_infrastructure_v1_1_vl_rfs.v" \

vlog -work axis_data_fifo_v2_0_13  -incr -mfcu  "+incdir+../../../AXIS4-STREAM.gen/sources_1/ip/axis_data_fifo_0/hdl" \
"../../ipstatic/hdl/axis_data_fifo_v2_0_vl_rfs.v" \

vlog -work xil_defaultlib  -incr -mfcu  "+incdir+../../../AXIS4-STREAM.gen/sources_1/ip/axis_data_fifo_0/hdl" \
"../../../AXIS4-STREAM.gen/sources_1/ip/axis_data_fifo_0/sim/axis_data_fifo_0.v" \

vcom -work xil_defaultlib  -93  \
"../../../AXIS4-STREAM.srcs/sources_1/new/MPG.vhd" \
"../../../AXIS4-STREAM.srcs/sources_1/new/axis_receiver.vhd" \
"../../../AXIS4-STREAM.srcs/sources_1/new/axis_transmitter.vhd" \
"../../../AXIS4-STREAM.srcs/sources_1/new/top.vhd" \

vlog -work xil_defaultlib \
"glbl.v"

