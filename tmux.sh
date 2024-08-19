tmux new-session -s bia-poc -d
tmux split-window -d
tmux split-window -d
tmux send-keys -t bia-poc.1 "pnpm run css-w" C-m
tmux send-keys -t bia-poc.2 "py3 -m http.server" C-m
tmux attach-session -t bia-poc