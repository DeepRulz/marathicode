from typing import Any, Dict, Optional
from marathi.errors import UndefinedVariableError

class Environment:
    """
    Hierarchical Scope Environment for MarathiCode.
    - Global Scope
      - Function Scope
        - Block Scope
    """
    def __init__(self, parent: Optional['Environment'] = None):
        self.parent = parent
        self.values: Dict[str, Any] = {}

    def define(self, name: str, value: Any) -> None:
        """Define a new variable in current scope (shadowing if exists in parent)."""
        self.values[name] = value

    def assign(self, name: str, value: Any) -> None:
        """Assign to existing variable in nearest scope where it's defined, or define locally."""
        if name in self.values:
            self.values[name] = value
        elif self.parent is not None and self.parent.has(name):
            self.parent.assign(name, value)
        else:
            # Default to current environment definition if not found elsewhere
            self.values[name] = value

    def get(self, name: str, line: Optional[int] = None) -> Any:
        """Retrieve variable value by searching up the scope chain."""
        if name in self.values:
            return self.values[name]
        if self.parent is not None:
            return self.parent.get(name, line=line)
        raise UndefinedVariableError(name, line=line)

    def has(self, name: str) -> bool:
        """Check if variable exists in this environment or any parent."""
        if name in self.values:
            return True
        if self.parent is not None:
            return self.parent.has(name)
        return False
